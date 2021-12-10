const { Drip } = require('js-conflux-sdk');
const {conflux, account} = require('./');
const fs = require('fs');

const abi = require('../build/MetaCoin/abi.json');
const bytecode = fs.readFileSync('./build/MetaCoin/bytecode').toString();

const metaCoinContract = conflux.Contract({
  abi,
  bytecode,
});

async function main() {
}

main().catch(console.log);