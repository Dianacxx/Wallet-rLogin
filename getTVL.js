const axios = require('axios');

// Formats number into currency
var tvl = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

// This function takes the output of the query after destructuring and prints TVL by day to the console
const printArray = (array) => {
    console.log('TVL(in millions) by day');
    for(let i=1; i < array.length; i++){
        let date = new Date(array[i]['date'] * 1000);
        console.log(`${date.getUTCMonth() + 1}/${date.getUTCDate()}/${date.getFullYear()}`, tvl.format(array[i]['tvlUSD']/ 1000000) + 'm');
    }
}

const poolKey = '"0x8ad599c3a0ff1de082011efddc58f1908eb6e6d8"';
const main = async() => {
    try{
        const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        {
            query: `
            {
            pools(first: 1 where: {id: ${poolKey}}){
                id
                totalValueLockedToken0
                totalValueLockedToken1
                token0{
                    name
                }
                token1{
                    name
                }
                poolDayData {
                    id
                    date
                    tvlUSD
                }
            }
            }
            `
        });
        // Object is destructured and array within is sent to the printArray function
        //Object.entries(result.data.data).map(([key, value]) => Object.entries(value).map(([key2, { poolId, poolDayData }]) => printArray(poolDayData)));
        Object.values(result.data.data).map(value => Object.values(value).map(({ poolId, poolDayData}) => printArray(poolDayData)));
    } catch(error) {
        console.error(error);
    }
}

main();