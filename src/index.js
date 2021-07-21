const Web3 = require('web3');
const GetPoolData = require('./getPoolData');

var tvl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

window.onload = function() {
    // Variables
    let web3;

    // Elements
    const connectButton = document.getElementById('connect');
    const content = document.getElementById('content');
    const account = document.getElementById('account');
    const poolButton = document.getElementById('pool');
    const poolData = document.getElementById('root');
    const poolList = document.getElementById('list');

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

    const showPoolData = () => {
        const poolKey = poolList.value;
        let poolDataHTML = '';
        root.innerHTML = '';
        GetPoolData.getTVL(poolKey).then(value => {
            Object.values(value).map(({id, poolDayData}) => {
                poolDataHTML = `<span>${id}</span>`;
                poolDayData.map(item => {
                    let date = new Date(item['date'] * 1000);
                    poolDataHTML = poolDataHTML + `<li>${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()} ${tvl.format(item['tvlUSD']/ 1000000) + 'm'}</li>`;
                })
                poolData.innerHTML = `<h1>${poolList.options[poolList.selectedIndex].innerHTML} TVL by day</h1>` + poolDataHTML;
            });
        });
    }

    // Listeners
    connectButton.addEventListener('click', connect);
    poolButton.addEventListener('click', showPoolData);
};