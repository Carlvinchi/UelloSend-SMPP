const smpp = require('smpp');
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
  session.bind_transmitter(
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
    /*
    else if (pdu.command == 'enquire_link'){

      session.send(pdu.response());
    }*/
    
  });

// function for mapping status codes to string 
const lookupPDUStatusKey = (pduCommandStatus)=> {
  for (var k in smpp.errors) {
      if (smpp.errors[k] == pduCommandStatus) {
          return k;
      }
  }
}

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
