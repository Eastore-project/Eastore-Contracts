'use strict';

const {
    utils: { deployContract },
} = require('@axelar-network/axelar-local-dev');
const CID = require('cids');

const CrossDeal = rootRequire('artifacts/contracts/call-fvm/CrossDeal.sol/CrossDeal.json');

async function deploy(chain, wallet) {
    console.log(`Deploying CrossDeal for ${chain.name}.`);
    chain.contract = await deployContract(wallet, CrossDeal, [chain.gateway, chain.gasService]);
    chain.wallet = wallet;
    console.log(`Deployed CrossDeal for ${chain.name} at ${chain.contract.address}.`);
}

async function execute(chains, wallet, options) {
    const { source, destination, calculateBridgeFee } = options;

    const fee = await calculateBridgeFee(source, destination);
    const commP = 'baga6ea4seaqowx4psaz6gic22zwbd6pdo5jlxiankvofjrqcnxotf6f6inpeshi';
    const cid = new CID(commP);

    const extraParamsV1 = [
        'https://data-depot.lighthouse.storage/api/download/download_car?fileId=ff1ad5e6-3756-496e-8711-1719b1a24370.car',
        1470235, //carSize,
        false, // taskArgs.skipIpniAnnounce,
        false, // taskArgs.removeUnsealedCopy
    ];
    const DealRequestStruct = [
        cid.bytes, //cidHex
        2097152, //taskArgs.pieceSize,
        true, //taskArgs.verifiedDeal,
        commP, //taskArgs.label,
        // 520000, // startEpoch
        1180000, // startEpoch
        1800000, // endEpoch
        0, // taskArgs.storagePricePerEpoch,
        0, // taskArgs.providerCollateral,
        0, // taskArgs.clientCollateral,
        1, //taskArgs.extraParamsVersion,
        extraParamsV1,
    ];
    const tx = await source.contract.makeBatchCrossDeal(destination.id, destination.contract.address, [DealRequestStruct], {
        value: fee,
    });
    const reciept = await tx.wait();
    console.log(reciept.transactionHash);
    console.log('done');
}

module.exports = {
    deploy,
    execute,
};
