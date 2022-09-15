const Caver = require('caver-js')
const caver = new Caver('https://api.baobab.klaytn.net:8651/')
const dotenv = require("dotenv");
dotenv.config();
const DIDContractABI = require('./DIDCONTRACT_ABI.json');
const DIDContractAddress = "0x9BdC1344b8B3773D6d79ed9e254825FE30B217f4";
async function testFunction() {

    const maked = caver.wallet.keyring.generate();
    caver.wallet.add(maked);
    const testDID = "did:klay:"+maked.address.slice(2);
    console.log(testDID)

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
        from: maked.address,
        feeDelegation: true,
        feePayer: keyring.address,
        feeRatio: 50, // Without feeRatio, `send` will use FeeDelegatedSmartContractExecution
        gas: 1000000,
    }, 'addService', testDID, 'testID', 'testPubKey')
    console.log(`Deployer signed transaction: `)
    //console.log(executionTx)

     const signedSender = await caver.wallet.sign(maked.address, executionTx)
     console.log(signedSender)
     const signed  = await caver.wallet.signAsFeePayer(keyring.address, signedSender)
     const receipt = await caver.rpc.klay.sendRawTransaction(signed)
    console.log(receipt)
}

testFunction()