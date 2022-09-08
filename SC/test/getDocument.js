const util = require('ethereumjs-util');
const Caver = require('caver-js');
const DIDContractABI = require('./DIDCONTRACT_ABI.json');

require('dotenv').config();
const accessKey = process.env.ACCESS_KEY_ID;
const secretKey = process.env.SECRET_ACCESS_KEY;
const chainId = process.env.CHAIN_ID;
const DIDContractAddress = process.env.DIDCONTRACT_ADDRESS;

const option = {
  headers: [
    {
      name: "Authorization",
      value: "Basic " + Buffer.from(accessKey + ":" + secretKey).toString("base64")
    },
    {name: "x-chain-id", value: chainId}
  ]
}

const caver =  new Caver(new Caver.providers.HttpProvider("https://node-api.klaytnapi.com/v1/klaytn", option));
const DIDContract = new caver.contract(DIDContractABI, DIDContractAddress);

async function test (){
  const res = await DIDContract.methods.getDocument('did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f9').call();
  console.log(res)
}

test()