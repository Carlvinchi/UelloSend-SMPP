// Database Model  for Users

const mongoose = require('mongoose');



const ReceiptSchema = new mongoose.Schema({
    message_id: {
        type: String
        
      },
      recipient: {
        type: String
        
      },
      sender_id: {
        type: String
        
      },
    submit_date: {
        type: String
        
      },
    
    done_date: {
        type: String
        
      },
    
    
      delivery_status: {
        type: String
        
      },
    error_code: {
        type: String
        
      },
    entry_date: {
        type: Date
        
      },  
}, {timestamps:true});




module.exports = mongoose.model('Receipt',ReceiptSchema);