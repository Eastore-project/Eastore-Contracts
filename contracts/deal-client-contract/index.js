'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');

const DealClient = rootRequire('./artifacts/contracts/deal-client-contract/DealClient.sol/DealClient.json');

async function deploy(chain, wallet) {
    console.log(`Deploying DealClient for ${chain.name}.`);
    chain.contract = await deployContract(wallet, DealClient, [chain.gateway, chain.gasService]);
    chain.wallet = wallet;
    console.log(`Deployed DealClient for ${chain.name} at ${chain.contract.address}`);
}
module.exports = {
    deploy,
};
