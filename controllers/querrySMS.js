const {session, lookupPDUStatusKey} = require('./fakeConn');
//const {session, lookupPDUStatusKey} = require('./connectController');
const logger = require('./logger');
const query_sms = async(req,res)=>{

    logger.info(req.query);
    //return  res.status(200).json({data: req.query});

    session.query_sm({
        //source_addr: req.query.sender_id,
        message_id: req.query.message_id
        
    }, (pdu)=> {
        let status_msg = lookupPDUStatusKey(pdu.command_status);
        if (pdu.command_status == 0) {
            // Message successfully sent
            logger.info(status_msg,{
              operation: 'query_sm'
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
            operation: 'query_sm'
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

module.exports = query_sms;