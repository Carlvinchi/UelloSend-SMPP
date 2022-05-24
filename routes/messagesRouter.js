const express = require('express');

const router = express.Router();


const single_message = require('../controllers/singleMessage');
const multi_message = require('../controllers/multiMessage');
const schedule_single_message = require('../controllers/scheduleSingle');
const schedule_multi_message = require('../controllers/scheduleMulti');
const query_sms = require('../controllers/querrySMS');
const {createReceipt,getReceipt,deleteReceipt,deleteManyReceipt,getAllReceipt}= require('../controllers/test-api');


router.post('/singlesms',single_message);
router.post('/multisms',multi_message);
router.post('/single-schedule',schedule_single_message);
router.post('/multi-schedule',schedule_multi_message);
router.route('/query').get(query_sms);
router.get('/receipt',getReceipt);
router.get('/receipt/all',getAllReceipt);
router.get('/receipt/delete',deleteReceipt);
router.get('/receipt/delete-many',deleteManyReceipt);

module.exports = router