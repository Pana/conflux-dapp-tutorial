const { Drip } = require('js-conflux-sdk');
const {conflux, account} = require('./');

async function main() {
  await invokeRPCMethods();
}

main().catch(console.log);

async function invokeRPCMethods() {
  const status = await conflux.cfx.getStatus();
  console.log('\n Current network status: ', status);

  const nonce = await conflux.cfx.getNextNonce(account.address);
  console.log(`\n nonce of  ${account.address} is ${nonce}`);
}

async function simpleTx() {
  const hash = await conflux.cfx.sendTransaction({
    from: account.address,
    to: 'cfxtest:aak7fsws4u4yf38fk870218p1h3gxut3ku00u1k1da',
    value: Drip.fromCFX(1),
  });
  console.log('\n tx hash: ', hash);
}