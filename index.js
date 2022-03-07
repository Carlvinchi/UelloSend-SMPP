const express = require('express');

const app = express();

const homeRouter = require('./routes/homeRouter');

const messagesRouter = require('./routes/messagesRouter');

app.use(express.json());

require('dotenv').config();

app.use('/api/v1/home', homeRouter);
app.use('/api/v1/messages', messagesRouter);

const port = process.env.PORT || 3500;

const start = async () => {
    try {
        
        app.listen(port, console.log(`Server is running on port ${port}...`));

    } catch (error) {
        console.log(error);
    }
}

start();