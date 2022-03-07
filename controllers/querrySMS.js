const session = require('./connectController');

const query_sms = async(req,res)=>{

    console.log(req.params);
    session.query_sm({
        source_addr: req.params.sender_id,
        message_id: req.params.message_id
        
    }, (pdu)=> {
        if (pdu.command_status == 0) {
            // Message successfully sent
            console.log("querrying")
            console.log(pdu);
            return  res.status(200).json({data: pdu});
        }
    });

}

module.exports = query_sms;