const express = require('express');

const router = express.Router();


const giveResponse = require('../controllers/homeController');

const {resp, query_resp }= require('../controllers/test-api');

router.get('/',giveResponse);
router.post('/test',resp);
router.get('/test',query_resp);

module.exports = router