const { Drip, CONST } = require('js-conflux-sdk');
const {conflux, account} = require('./');

const MetaCoinAddress = process.env.METACOIN_ADDRESS;
const SponsorWhitelistControl = conflux.InternalContract('SponsorWhitelistControl');

async function main() {
  await setGasSponsor();
  await setStorageSponsor();
  await setWhiteList();
}

main().catch(console.log);

async function setGasSponsor() {
  const upperBound = Drip.fromGDrip(10);
  const receipt = await SponsorWhitelistControl
    .setSponsorForGas(MetaCoinAddress, upperBound)
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(3),
    })
    .executed();
  console.log('Set gas sponsor', receipt.outcomeStatus === 0 ? 'success' : 'fail');
}

async function setStorageSponsor() {
  const receipt = await SponsorWhitelistControl
    .setSponsorForCollateral(MetaCoinAddress)
    .sendTransaction({
      from: account.address,
      value: Drip.fromCFX(50),
    })
    .executed();
  console.log('Set storage sponsor', receipt.outcomeStatus === 0 ? 'success' : 'fail');
}

async function setWhiteList() {
  const receipt = await SponsorWhitelistControl
    .addPrivilegeByAdmin(MetaCoinAddress, [CONST.ZERO_ADDRESS_HEX])
    .sendTransaction({
      from: account.address,
    })
    .executed();
  console.log('Set whitelist', receipt.outcomeStatus === 0 ? 'success' : 'fail');
}