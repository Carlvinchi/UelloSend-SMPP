const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const homeRouter = require('./routes/homeRouter');


//const messagesRouter = require('./routes/messagesRouter');

const logger = require('./controllers/logger');
app.use(express.json());
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

require('dotenv').config();

app.use('/api/v1/home', homeRouter);
//app.use('/api/v1/messages', messagesRouter);

const port = process.env.PORT || 3500;

const start = async () => {
    try {
        
        app.listen(port, logger.info(`Server is running on port ${port}...`,
        {
            operation: 'Starting the server'
        }
        ));

    } catch (error) {
        logger.error(error,{
            operation: 'Starting the server'
        });
    }
}

start();