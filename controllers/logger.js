const winston = require('winston');

const { Logtail } = require('@logtail/node');
const { LogtailTransport } = require('@logtail/winston');

// Create a Logtail client
const logtail = new Logtail('b2TxfNKXC5SW889rWUZZT4FR');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL,
  format: winston.format.combine(
      winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.json()
  ),
  transports: [
      new winston.transports.Console(),
      new winston.transports.File({filename: './logs/combined.log'}),
      new LogtailTransport(logtail)
    ],
});

/*
logger.info('Info message trying to connect',{
    operation: 'submit_sm',

});
*/


//consoleTransport.level = process.env.LOG_LEVEL;

module.exports = logger;
