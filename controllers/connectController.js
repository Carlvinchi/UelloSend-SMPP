const smpp = require('smpp');
const Receipt = require('../model/Receipts');
require('dotenv').config();
const logger = require('./logger');

const session = new smpp.Session({
  host: process.env.HOST1, 
  port: process.env.CPORT,
  //auto_enquire_link_period: 1000,
  debug:true
});


//session.auto_enquire_link_period = 1000; // for keeping the connection alive

let isConnected = false
session.on('connect', () => {
  isConnected = true;
  binder(); 

});

const binder = ()=>{
  session.bind_transceiver(
  {
    system_id: process.env.USERNAME,
      password: process.env.PASS,
      interface_version: 1,
      addr_ton: 1,
      addr_npi: 1,
  }, (pdu) => {
      
      if (pdu.command_status == 0) 
      {
        logger.info('Successfully bound',{
          operation: 'bind_transceiver'
        });
        logger.info('Session has started',{
          operation: 'bind_transceiver'
        });
      }
      else{
        logger.info('Unable to bind',{
          operation: 'bind_transceiver'
        });
        logger.error(`Unable to bind, pdu status:  ${lookupPDUStatusKey(pdu.command_status)}`,{
          operation: 'bind_transceiver'
        } );
        process.exit(0);
      }
    }
);}

// incoming request from SMSC
  session.on('pdu', (pdu)=>{
    // incoming SMS from SMSC
    if (pdu.command == 'deliver_sm'){
      // Reply to SMSC that we received and processed the SMS
      var today = new Date();
    var dd = today.getDate();
    
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    
    today = yyyy+'-'+mm+'-'+dd;
    
      var  myString = pdu.short_message.message.split(' ');
        var message_id = myString[0].split(':')[1];
        var submit_date = myString[4].split(':')[1];
        var done_date = myString[6].split(':')[1];
        var delivery_status = myString[7].split(':')[1];
        var error_code = myString[8].split(':')[1];

        var payload = {
          message_id: message_id,
          recipient: pdu.source_addr,
          sender_id:pdu.destination_addr,
          submit_date: submit_date,
          done_date: done_date,
          delivery_status: delivery_status,
          error_code: error_code,
          entry_date: today
        }
       createReceipt(payload);
      session.send(pdu.response());
    }
    else if (pdu.command == 'data_sm'){
      
      /* Reply to SMSC that we received and processed the SMS
      session.data_sm_resp({ 
        sequence_number: pdu.sequence_number,
        message_id: pdu.short_message.id
      });
      */
      session.send(pdu.response());
      
    }
    else if (pdu.command == 'outbind'){
      
      binder(); // Reply to outbind request with bind_transceiver request
    }
    else if (pdu.command == 'unbind'){
      
      session.send(pdu.response());
    }
    
    else if (pdu.command == 'enquire_link'){

      session.send(pdu.response());
    }
    
  });

// function for mapping status codes to string 
const lookupPDUStatusKey = (pduCommandStatus)=> {
  for (var k in smpp.errors) {
      if (smpp.errors[k] == pduCommandStatus) {
          return k;
      }
  }
}

const createReceipt =  async(payload) =>{
    
  try {
         const receipt = await Receipt.create({...payload});

         logger.info('Receipt saved',{
          operation: 'save_delivery_receipt'
        });
        
        console.log(receipt);
         
         
     } catch (error) {
         logger.error(`msg:  ${error}`,{
          operation: 'save_delivery_receipt'
        } );
     }
     
 }

 const makeFromDate = ()=>{

    var expired = new Date();

    expired.setDate(expired.getDate() - 60);
    var dd = expired.getDate();
    
    var mm = expired.getMonth()+1; 
    var yyyy = expired.getFullYear();
    if(dd<10) 
    {
        dd='0'+dd;
    } 
    
    if(mm<10) 
    {
        mm='0'+mm;
    } 
    
    expired = yyyy+'-'+mm+'-'+dd;

    return expired;

 }

 const makeToDate = ()=>{

  var expired = new Date();

  expired.setDate(expired.getDate() - 30);
  var dd = expired.getDate();
  
  var mm = expired.getMonth()+1; 
  var yyyy = expired.getFullYear();
  if(dd<10) 
  {
      dd='0'+dd;
  } 
  
  if(mm<10) 
  {
      mm='0'+mm;
  } 
  
  expired = yyyy+'-'+mm+'-'+dd;

  return expired;

}

 const deleteManyReceipt = async() =>{
      const fromDate =  makeFromDate();
      const toDate =  makeToDate();

  try {
      const receipt = await Receipt.deleteMany({
        entry_date: { $gte: fromDate, $lte: toDate }
      });
      
       logger.info(`${receipt}`,{
        operation: 'delete_receipt'
      });
  } catch (error) {
    logger.info(`${error}`,{
      operation: 'delete_receipt'
    });
  }
}

deleteManyReceipt();
//const smpp_reconnector = ()=> session.connect();    //reconnect again
  

session.on('close', async() => {
  logger.info('smpp server is now disconnected');
  logger.info('Session will be restarted');
  process.exit(0);
});

session.on('error', error => { 
  logger.error(`SMPP  ${error}`,{
    operation: 'session connection'
  }); 
  process.exit(0);
});

module.exports = {session, lookupPDUStatusKey};
