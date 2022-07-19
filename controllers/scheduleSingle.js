const {session, lookupPDUStatusKey}= require('./fakeConn');
//const {session, lookupPDUStatusKey} = require('./connectController');
const logger = require('./logger');

const schedule_single_message = async(req,res)=>{

  const  {sender_id, message, recipient, reference, date} = req.body;
    const smpp_date = await create_SMPP_date_format(date);
    session.submit_sm({
        source_addr: sender_id,
        destination_addr: recipient,
        short_message: message,
        schedule_delivery_time: smpp_date, //YYMMDDhhmmss, note hh = 00-23
        registered_delivery: 1,
        user_message_reference: reference
    }, (pdu)=> {
      let status_msg = lookupPDUStatusKey(pdu.command_status);
      if (pdu.command_status == 0) {
          // Message successfully sent
          logger.info(status_msg,{
            operation: 'schedule sms'
          });
          return  res.status(200).json({
              data: {
                message_id: pdu.message_id,
                status_message: status_msg
            }
         });
      }
      else{
        // Message successfully sent
        
        logger.error(status_msg,{
          operation: 'submit_sm, schedule sms'
        });
        return  res.status(400).json({
            data: {
              pdu_data: pdu,
              status_message: status_msg
           }
      });
    }

    });

}


const create_SMPP_date_format = async(my_date_time)=>{

  var time = my_date_time.substr(-8,8); // extract the time portion of the date
  
  var hours = parseInt(time.substr(0, 2)); // extract the hours part of the time
  if(time.indexOf('AM') != -1 && hours == 12) {
      time = time.replace('12', '00');
  }
  if(time.indexOf('PM')  != -1 && hours < 12) {

    if(time.startsWith('0')){
      time = time.slice(1);
    }
      time = time.replace(hours, (hours + 12));
  }
  time = time.replace(/(AM|PM)/, '');
  
  var my_date =  my_date_time.substr(0,10); // extract the date part of the datetime object

  
  my_date = my_date.split("-").reverse().join("-"); // split and reverse the date and then join 


  my_date = my_date.split('-').join('');
  my_date = my_date.slice(2);

  time = time.split(':').join('');
  time = time+"01+";
  time = time.split(' ').join(''); 

  var final_date_time = my_date+''+time;
  final_date_time = final_date_time.trim();
  
  return final_date_time;
};


module.exports = schedule_single_message;