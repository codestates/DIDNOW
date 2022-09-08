const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();

const abi = require("./abi");
let keyring;

async function testFunction() {
  keyring = caver.wallet.keyring.generate();
  caver.wallet.add(keyring);
  console.log(keyring);
}
testFunction();

async function kaikasFunction() {
  const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey(
    process.env.PRIVATE_KEY
  );
  caver.wallet.add(keyringFromPrivateKey);
  keyring = keyringFromPrivateKey;
}
// kaikasFunction();

async function contractFunction() {
  const contractInstance = new caver.contract(
    abi,
    "0xBA840C124072381fDdE8211ac0ed771CAc3dCc2b"
  );
  // console.log(contractInstance);
  // console.log(contractInstance.options.address);
  await contractInstance.methods
    .addService(
      "did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f3",
      "serviceId3",
      "pemPubKey3",
      "0x7423de10c75b1d4d1f30a4d81386e3aaf22584f3"
    )
    .send({
      from: keyring._address,
      gas: "7500000",
    });
  //   const temp = await contractInstance.methods.retrieve().call();
  //   console.log(temp);
}

async function test(){
    const contractInstance = new caver.contract(
        abi,
        "0xBA840C124072381fDdE8211ac0ed771CAc3dCc2b"
      );
    const temp = await contractInstance.methods
    .getDocument("did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f8").call();
    console.log(temp);
};

// contractFunction();

// test();
