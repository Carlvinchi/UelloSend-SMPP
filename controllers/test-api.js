
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

module.exports = {resp, query_resp};