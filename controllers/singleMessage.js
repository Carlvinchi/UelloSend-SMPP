const session = require('./connectController');

const send_single_message = async(req,res)=>{

  const  {sender_id, message, recipient, reference} = req.body;
    session.submit_sm({
        source_addr: sender_id,
        destination_addr: recipient,
        short_message: message,
        registered_delivery: 1,
        user_message_reference: reference
    }, (pdu)=> {
        if (pdu.command_status == 0) {
            // Message successfully sent
            console.log("Sending message")
            console.log(pdu.message_id);
            return  res.status(200).json({data: pdu});
        }
    });

}

module.exports = send_single_message;