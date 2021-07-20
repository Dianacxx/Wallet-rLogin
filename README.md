# CRYPTO-project

## David

This project uses dependencies axios@0.21.1 and web3@1.3.4, and devDependecies webpack@4.46.0, webpack-cli@4.7.2, webpack-dev-server@3.11.2

## History of changes
### install axios and add getTVL.js file

What this file does is grab data from the subgraph, put it into an object, destructure that object to isolate an array, put the array into 'Date TVL(in millions)' format, and then print it to the console.

The file should be reworked into a function that accepts a poolId and returns an array with the TVL historical data, then it must be put into a module that exports the function to be used with a React app.

### connect to wallet

webpack creates a server that sends information to an HTML page, the script checks for a web3provider (I have used Metamask), sends a request to the provider and fetches and array of account addresses, then prints the account address to the UI, the button only provides the ability to connect, to disconnect an account the user must delete the website from the provider app