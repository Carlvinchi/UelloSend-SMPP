const Receipt = require('../model/Receipts');

const resp = async(req,res)=>{
    console.log(req.body);
    return  res.status(200).json({
        data: req.body
});
}

const query_resp = async(req,res)=>{
    console.log(req.query);
    return  res.status(200).json({
        data: req.query
});
}

const createReceipt =  async(req, res) =>{

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
    
    
    try {
           const receipt = await Receipt.create({
            message_id: req.body.message_id,
            recipient: req.body.source_addr,
            sender_id: req.body.sender_id,
            submit_date: req.body.submit_date,
            done_date: req.body.done_date,
            delivery_status: req.body.delivery_status,
            error_code: req.body.error_code,
            entry_date: today
           });

            return res.status(200).json({receipt});
           
           
       } catch (error) {
        return  res.status(500).json({msg: error});
       }
       
   }


const getReceipt = async(req,res ) =>{
    try {
        const receipt = await Receipt.find({
            message_id: req.query.message_id,
            sender_id: req.query.sender_id
        });

        return res.status(200).json({receipt});
    } catch (error) {
        return  res.status(500).json({msg: error});
    }
    
}

const getReceiptss = async(req,res ) =>{
    try {
        const receipt = await Receipt.find({
           entry_date: { $gte: req.query.date1, $lte: req.query.date2 }
        });

        return res.status(200).json({receipt});
    } catch (error) {
        return  res.status(500).json({msg: error});
    }
    
}

const getAllReceipt = async(req,res ) =>{
    try {
        const receipt = await Receipt.find({});

        return res.status(200).json({receipt});
    } catch (error) {
        return  res.status(500).json({msg: error});
    }
    
}



const deleteReceipt = async(req,res ) =>{
    try {
        const receipt = await Receipt.deleteOne({messsage_id: req.query.message_id});
        
         return res.status(200).json({msg: receipt});
    } catch (error) {
        return  res.status(500).json({msg: error});
    }
}

const deleteManyReceipt = async(req,res ) =>{
    try {
        const receipt = await Receipt.deleteMany({
            entry_date: { $gte: req.query.fromDate, $lte: req.query.toDate }
        });
        
         return res.status(200).json({msg: receipt});
    } catch (error) {
        return  res.status(500).json({msg: error});
    }
}


module.exports = {resp, query_resp,createReceipt,getReceipt,deleteReceipt,deleteManyReceipt,getAllReceipt};