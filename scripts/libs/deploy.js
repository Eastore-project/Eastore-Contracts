'use strict';

const { getDefaultProvider, utils } = require('ethers');
const { outputJsonSync } = require('fs-extra');
/**
 * Deploy a contract to a list of chains.
 * @param {string} env - The environment to deploy to.
 * @param {Chain[]} chains - The chain objects to deploy to.
 * @param {Wallet} wallet - The wallet to use for deployment.
 * @param {Object} example - The example to deploy.
 */
async function deploy(env, chains, wallet, example) {
    await preDeploy(chains, wallet, example);
    await doDeploy(chains, wallet, example);
    await postDeploy(chains, wallet, example);

    // Serialize the contracts by storing the human-readable abi with the address in the json file.
    for (const chain of chains) {
        for (const key of Object.keys(chain)) {
            if (isSerializableContract(chain[key])) {
                chain[key] = serializeContract(chain[key]);
            }
        }

        // Remove the wallet from the chain objects.
        delete chain.wallet;
    }

    // Write the chain objects to the json file.
    if (chains[0].name == 'Filecoin') {
        setJSON(chains, `./chain-config-filecoin/${env}.json`);
    } else setJSON(chains, `./chain-config/${env}.json`);
}

// Run the preDeploy function if it exists.
function preDeploy(chains, wallet, example) {
    if (!example.preDeploy) return;

    return example.preDeploy(chains, wallet);
}

// Deploy the contracts.
function doDeploy(chains, wallet, example) {
    const deploys = chains.map((chain) => {
        const provider = getDefaultProvider(chain.rpc);
        return example.deploy(chain, wallet.connect(provider));
    });

    return Promise.all(deploys);
}

// Run the postDeploy function if it exists.
function postDeploy(chains, wallet, example) {
    if (!example.postDeploy) return;

    const deploys = chains.map((chain) => {
        const provider = getDefaultProvider(chain.rpc);
        return example.postDeploy(chain, chains, wallet.connect(provider));
    });

    return Promise.all(deploys);
}

function serializeContract(contract) {
    return {
        abi: contract.interface.format(utils.FormatTypes.full),
        address: contract.address,
    };
}

function isSerializableContract(obj) {
    return obj && obj.interface;
}
const setJSON = (data, name) => {
    outputJsonSync(name, data, {
        spaces: 2,
        EOL: '\n',
    });
};
module.exports = {
    deploy,
};
