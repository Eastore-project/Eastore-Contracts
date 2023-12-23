# FVM Cross-Chain Deals Starter Kit by Eastore

This starter kit is designed to help developers make cross-chain deals in FVM with the help of Axelar contracts. This would enable devs to interact with Deal Client contract on Filecoin from different chains and accesss the filecoin native features like storage, miner info, etc. from other chains.

## Built With

-   [FVM](https://fvm.filecoin.io/)
-   [Axelar](https://axelar.network/)
-   [Hardhat](https://hardhat.org/)
-   [Ethers.js](https://docs.ethers.io/v5/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   You have installed [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/).
-   You have a basic understanding of Javascript and Solidity.

## Installation

To install the FVM Cross-Chain Deals Starter Kit, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/eastore-project/Eastore-Contracts.git
```

2. Navigate to the project directory:

```bash
cd Eastore-Contracts
```

3. Install the dependencies:

```bash
npm install
```

## Usage

So as to use Eastore-Contracts, follow these steps:

1.  Build the contracts:

```bash
npm run build
```

2. Deploy the parent Deal Client contract on Filecoin:

```bash
npm run deploy deal-client-contract testnet Filecoin
```

3.  Deploy the child contract that makes cross-chain calls to parent contract on Polygon or any other supported chain (you can view the supported chains [here](https://docs.axelar.dev/resources/testnet)):

```bash
npm run deploy call-fvm testnet Polygon
```

4. Execute the cross-chain call from child contract to parent contract:

```bash
 npm run execute call-fvm testnet Polygon Filecoin
```

Currently, demo deal params to make cross-chain deal are available [here](https://github.com/Eastore-project/Eastore-Contracts/blob/master/contracts/call-fvm/index.js). You can obtain deal params for your files [here](https://data.lighthouse.storage/)

## Contributing

We welcome contributions from the community. To contribute:

1. Fork the project.
2. Create a new branch.
3. Make your changes and write tests when practical.
4. Commit your changes to the new branch.
5. Submit a pull request.

## License

This project uses the following license: [GNU General Public License v3.0](./LICENSE).
