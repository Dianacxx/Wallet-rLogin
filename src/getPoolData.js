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

// This function returns a promise that fulfills to the TVL in the entered pool
const getTVL = async() => {
    try{
        const result = await axios.post('https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3',
        {
            query: `
            {
            pools(orderBy: totalValueLockedETH first: 5 ){
                id
                totalValueLockedToken0
                totalValueLockedToken1
                token0{
                    symbol
                }
                token1{
                    symbol
                }
                poolDayData{
                    id
                    date
                    tvlUSD
                    feesUSD
                }
                totalValueLockedETH
                feeGrowthGlobal0X128

            }
            }
            `
        });
        // Object is destructured and array within is sent to the printArray function
        //Object.entries(result.data.data).map(([key, value]) => Object.entries(value).map(([key2, { poolId, poolDayData }]) => printArray(poolDayData)));
        //Object.values(result.data.data).map(value => Object.values(value).map(({ poolId, poolDayData}) => printArray(poolDayData)));
        return result.data.data.pools;
    } catch(error) {
        console.error(error);
    }
}

module.exports = { getTVL, printArray };