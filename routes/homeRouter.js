const express = require('express');

const router = express.Router();


const giveResponse = require('../controllers/homeController');


router.get('/',giveResponse);

module.exports = router