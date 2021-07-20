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
            let provider = window.ethereum;
            if(provider) {
                await provider.request({ method: 'eth_requestAccounts' });
                
                web3 = new Web3(provider);

                web3.eth.getAccounts().then(addresses => {
                    account.innerText = addresses[0];
                });

                content.style.display = '';
                connectButton.style.display = 'none';
            } else {
                alert('You require a web3 provider');
            }
        } catch(error) {
            alert('You have rejected the request');
        }
    }

    // Listeners
    connectButton.addEventListener('click', connect);
};