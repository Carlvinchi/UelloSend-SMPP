//const session = require('./fakeConn');
const {session, lookupPDUStatusKey} = require('./connectController');

const send_multi_message = async(req,res)=>{

  const  {sender_id, message, recipient, reference} = req.body;
    
    session.submit_multi({
        source_addr: sender_id,
        number_of_dests: 1,
        dest_address: [{
            dest_flag: 1,
               dest_addr_ton: 1,
               dest_addr_npi: 1,
               destination_addr: recipient
        

        }],// must be an array of objects
        short_message: message,
        data_coding: 1,
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

module.exports = send_multi_message;