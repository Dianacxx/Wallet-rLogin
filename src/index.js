const Web3 = require('web3');

window.onload = function() {
    // Variables
    let web3;

    // Elements
    const connectButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');

    // Functions
    const connect = async() => {
        try {
            // find provider
            let provider = window.ethereum;
            if(provider) {
                // send connection request to wallet
                await provider.request({ method: 'eth_requestAccounts' });
                
                // use web3 to fetch array of accounts
                web3 = new Web3(provider);

                web3.eth.getAccounts().then(addresses => {
                    account.innerText = addresses[0];
                });
                
                // display account information and hidde connectButton
                content.style.display = '';
                connectButton.style.display = 'none';
            } else {
                // handler in case a web3 provider is not found
                alert('You require a web3 provider');
            }
        } catch(error) {
            // handler in case user rejects the connection request
            alert('You have rejected the request');
        }
    }

    // Listeners
    connectButton.addEventListener('click', connect);
};