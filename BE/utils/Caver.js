const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();

const abi = require("./abi");
let keyring;

async function testFunction() {
  keyring = caver.wallet.keyring.generate();
  caver.wallet.add(keyring);
  const res = {
    publicKey: keyring._address,
    privateKey: keyring._key._privateKey
  }
  console.log(res);
}
//testFunction();


// const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey(
//   process.env.PRIVATE_KEY
// );
// caver.wallet.add(keyringFromPrivateKey);
// keyring = keyringFromPrivateKey;


async function contractFunction() {
  const contractInstance = new caver.contract(
    abi,
    process.env.DIDCONTRACT_ADDRESS
  );
  // console.log(contractInstance);
  // console.log(contractInstance.options.address);
  await contractInstance.methods
    .addService(
      "did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f8",
      "serviceId2212",
      "pemPubKey2122"
    )
    .send({
      from: keyring._address,
      gas: "75000000",
    });
  //   const temp = await contractInstance.methods.retrieve().call();
  //   console.log(temp);
}

async function test(){
    const contractInstance = new caver.contract(
        abi,
        "0xf95BA0302Bc3a97A89F8d2532C08888d08e2dc80"
      );
    const temp = await contractInstance.methods
    .getAllService("did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f8").call();

    const res = temp.reduce((res,cur,idx)=>{
      if(cur[0]=='registeredId'){
        return cur[1];
      }
    },'')

    console.log(res)
};
//contractFunction();
test();
