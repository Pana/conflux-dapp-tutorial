/*
  TODO: Error handling
  *. requestAccounts failed
  *. Sending transaction failed
*/
const addressUtils = TreeGraph.address;

const metaCoinAddress = 'cfxtest:achmuxabbazzzud7aexun00s5gsgmvgs82agjrawww';
const COIN_SYMBOL = 'MTC';

const confluxClient = new TreeGraph.Conflux({
  url: 'https://test.confluxrpc.com',
  logger: console,
  networkId: 1,
});

const metaCoinContract = confluxClient.Contract({
  address: metaCoinAddress,
  abi: metaCoinAbi,
});

let currentAccount;

// load
$(document).ready(function() {

  $('#connectPortal').click(async function() {
    if(!window.conflux) {
      alert('Please install Conflux Portal');
      return;
    }
    const _accounts = await conflux.send('cfx_requestAccounts');
    if (_accounts.length == 0) {
      alert('Request accounts failed');
      return;
    }
    currentAccount = _accounts[0];
    $('#connectPortal').hide();
    $('#contractInteract').show();
    $('#currentAccount').text(addressUtils.shortenCfxAddress(currentAccount));

    await updateBalance();

    // set portal instance as confluxClient provider
    confluxClient.provider = conflux;
  });

  $('#claimMetaCoin').click(async function() {
    claimLoading(true);
    const txHash = await metaCoinContract.faucet().sendTransaction({
      from: currentAccount,
    });
    await checkReceipt(txHash);
    await updateBalance();
    claimLoading(false);  
  });

  $('#transfer').click(async function(e) {
    e.preventDefault();
    const to = $('#to').val();
    const amount = $('#amount').val();
    if(!to || !amount) {
      alert('Please fill in all fields.');
      return
    }

    transferLoading(true);
    try{
      const hash = await metaCoinContract.transfer(to, parseInt(amount)).sendTransaction({
        from: currentAccount,
      });
      showTxHash(hash);

      await checkReceipt(hash);
      await updateBalance();
    } catch(e) {
      alert('Sending transaction failed');
    }
    transferLoading(false);
  });
});

async function updateBalance() {
  const balance = await metaCoinContract.balanceOf(currentAccount);
  $('#mcBalance').text(balance + ' ' + COIN_SYMBOL);
}

async function checkReceipt(hash) {
  let receipt;
  while(true) {
    receipt = await confluxClient.getTransactionReceipt(hash);
    if (receipt) {
      break;
    }
    await sleep(1000);
  }
  return receipt;
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function claimLoading(show) {
  const ele = $('#claimMetaCoin span');
  if (show) {
    ele.removeClass('d-none');
  } else {
    ele.addClass('d-none');
  }
}

async function transferLoading(show) {
  const ele = $('#transfer span');
  if (show) {
    ele.removeClass('d-none');
  } else {
    ele.addClass('d-none');
  }
}

function showTxHash(hash) {
  const ele = $('#scanLink');
  const link = 'https://test.confluxrpc.com/transaction/' + hash;
  ele.parent().removeClass('d-none');
  ele.text(hash).attr('href', link);;
}