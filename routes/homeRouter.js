const express = require('express');

const router = express.Router();


const giveResponse = require('../controllers/homeController');

const {resp, query_resp,createReceipt,getReceipt,deleteReceipt,deleteManyReceipt,getAllReceipt}= require('../controllers/test-api');

router.get('/',giveResponse);
router.post('/test',resp);
router.get('/test',query_resp);
router.get('/receipt',getReceipt);
router.get('/receipt/all',getAllReceipt);
router.get('/receipt/delete',deleteReceipt);
router.get('/receipt/delete-many',deleteManyReceipt);
router.post('/receipt',createReceipt);

module.exports = router