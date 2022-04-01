//const {session, lookupPDUStatusKey}= require('./fakeConn');
const {session, lookupPDUStatusKey} = require('./connectController');

const schedule_single_message = async(req,res)=>{

  const  {sender_id, message, recipient, reference, date} = req.body;
    session.submit_sm({
        source_addr: sender_id,
        destination_addr: recipient,
        short_message: message,
        schedule_delivery_time: date, //YYMMDDhhmmss, note hh = 00-23
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

module.exports = schedule_single_message;