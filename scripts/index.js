const {
  Conflux,
} = require('js-conflux-sdk');
require('dotenv').config();

// Initial Conflux instance with url and networkId
const conflux = new Conflux({
  url: 'https://test.confluxrpc.com',
  networkId: 1
});

// Add private key to conflux.wallet, which will be used when sending transaction
const account = conflux.wallet.addPrivateKey(process.env.PRIVATE_KEY);  // Please set private key in the .env file

module.exports = {
  conflux,
  account
}