const smpp = require('smpp');
require('dotenv').config();
const session = new smpp.Session({host: process.env.HOST, port: process.env.CPORT});

let isConnected = false
session.on('connect', () => {
  isConnected = true;

  session.bind_transceiver({
      system_id: process.env.USERNAME,
      password: process.env.PASS,
      interface_version: 1,
      //system_type: '380666000600',
      //address_range: '+380666000600',
      addr_ton: 1,
      addr_npi: 1,
  }, (pdu) => {
    if (pdu.command_status == 0) {
        console.log('Successfully bound')
    }

  })
})

session.on('close', () => {
  console.log('smpp is now disconnected') 
   
  if (isConnected) {        
    session.connect();    //reconnect again
  }
})

session.on('error', error => { 
  console.log('smpp error', error)   
  isConnected = false;
});

      


module.exports = session;
