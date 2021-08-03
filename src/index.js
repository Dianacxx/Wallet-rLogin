const Web3 = require('web3');
const GetPoolData = require('./getPoolData');

var tvl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
var yield = new Intl.NumberFormat('en-UD',{
    style: 'percent',
    minimumFractionDigits:2,
    
});
// yield.setMinimumFractionDigits(2);
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
    const parseJsonAsync = (jsonString) => {
        
        return new Promise(resolve => {
            setTimeout(() => {
              resolve(JSON.stringify(jsonString))
            })
        })        
    }

    // const poolKey = poolList.value;
    const destructuredData = () =>{
        GetPoolData.getTVL().then(value => {
            Object.values(value).map(({id, token0, token1, totalValueLockedETH, poolDayData}) => {
                // console.log(token0.symbol,token1.symbol, totalValueLockedETH, poolDayData.feesUSD)
                let acumTVL = new Number();
                let monthlyAcumTVL = new Number();
                let acumFeesUSD =new Number();
                let monthlyAcumFees =new Number();
                var firstTokenSymbol = new String (token0.symbol);
                var secondTokenSymbol = new String (token1.symbol);
                // var TVL = tvl.format(item['tvlUSD']/ 1000000) + 'm';
                var TVL = totalValueLockedETH;
                var feesArray = new Array();
                var tvlArray = new Array();
                var lastMonthFees = new Array();
                var lastMonthTVL = new Array();

                for (let i = 0; i < poolDayData.length; i++) {
                    feesArray.push(poolDayData[i].feesUSD/1000000);
                    tvlArray.push(poolDayData[i].tvlUSD/1000000);
                }
                for (let i = 0; i < poolDayData.length; i++) {
                    feesArray.push(poolDayData[i].feesUSD/1000000);
                    tvlArray.push(poolDayData[i].tvlUSD/1000000);
                }
                for (let i = 60;  i < poolDayData.length; i++) {
                    lastMonthFees.push(poolDayData[i].feesUSD/1000000);
                    lastMonthTVL.push(poolDayData[i].tvlUSD/1000000);
                }

                acumTVL =  tvlArray.reduce(function(a, b){
                    return a + b;
                }, 0)
                

                acumFeesUSD =  feesArray.reduce(function(a, b){
                    return a + b;
                }, 0)
                
                monthlyAcumFees =  lastMonthFees.reduce(function(a, b){
                    return a + b;
                }, 0)
                
                monthlyAcumTVL =  lastMonthTVL.reduce(function(a, b){
                    return a + b;
                }, 0)
               
               
                let yieldTotal= yield.format(acumFeesUSD/acumTVL)
                let yieldMonth = yield.format(monthlyAcumFees/monthlyAcumTVL)
                //let yield = acumTVL/acumFeesUSD;
                // console.log(feesArray.length);
                console.log(" first Token Symbol: " + firstTokenSymbol + 
                " second Token Symbol: " + secondTokenSymbol+ 
                " Total Value Locked ETH: " + TVL+ 
                " Yield (90 days): " + yieldTotal + " Yield (30/31) Days: " + yieldMonth)
                // console.log("AcumTVL: " + acumTVL + " Lenght: " + lastMonthFees.length +" Monthly acum TVL: " + monthlyAcumFees) 
            })

        })
        return firstTokenSymbol, secondTokenSymbol, TVL, yieldTotal;
    }
        

        
    
    // Listeners
    connectButton.addEventListener('click', connect);
    poolButton.addEventListener('click', destructuredData);

};
module.exports = { destructuredData };