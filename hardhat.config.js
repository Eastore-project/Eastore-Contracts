require('hardhat-gas-reporter');
require('solidity-coverage');

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    solidity: {
        version: '0.8.9',
        settings: {
            evmVersion: process.env.EVM_VERSION || 'london',
            optimizer: {
                enabled: true,
                runs: 1000,
                details: {
                    peephole: true,
                    inliner: true,
                    jumpdestRemover: true,
                    orderLiterals: true,
                    deduplicate: true,
                    cse: true,
                    constantOptimizer: true,
                    yul: true,
                    yulDetails: {
                        stackAllocation: true,
                    },
                },
            },
        },
    },
    solidity: {
        version: '0.8.17',
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
                details: { yul: false },
            },
        },
    },
    paths: {
        sources: './contracts',
        artifacts: './artifacts',
    },
};
