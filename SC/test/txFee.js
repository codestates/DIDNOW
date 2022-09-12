const fs = require('fs')
const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const dotenv = require("dotenv");
dotenv.config();
const DIDContractABI = require('./DIDCONTRACT_ABI.json');
const DIDContractAddress = "0x9BdC1344b8B3773D6d79ed9e254825FE30B217f4";
async function testFunction() {

    // Decrypt keystore
    const keyring = caver.wallet.keyring.createFromPrivateKey(
    process.env.PRIVATEKEY
    );
    console.log(keyring)

    // Add to caver.wallet
    caver.wallet.add(keyring)
    
    const DIDContract = new caver.contract(DIDContractABI, DIDContractAddress);

    // Create value transfer transaction
    const executionTx = await DIDContract.sign({
        from: keyring.address,
        feeDelegation: true,
        feePayer: keyring.address,
        feeRatio: 50, // Without feeRatio, `send` will use FeeDelegatedSmartContractExecution
        gas: 1000000,
    }, 'addService', 'did:klay:bC14CB49b93Ee36AfdF4b49eCB7C9512f9353c93', 'testID2', 'testPubKey')
    console.log(`Deployer signed transaction: `)
    console.log(executionTx)

     //const signed = await caver.wallet.sign(keyring.address, executionTx)
     const signed  = await caver.wallet.signAsFeePayer(keyring.address, executionTx)
     const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}

testFunction()