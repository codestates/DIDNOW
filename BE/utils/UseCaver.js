const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();
const contractAddress = process.env.DIDCONTRACT_ADDRESS;
const testDID = "did:klay:7423de10c75b1d4d1f30a4d81386e3aaf22584f3";

const abi = require("./abi");

/*
    @ dev : Generate Klaytn Wallet
    @ desc : 임의의 월렛 퍼블릭키와 프라이빗키를 생성합니다.
        - Return {publicKey:"",privateKey:""}
*/
const genWallet = () => {
  keyring = caver.wallet.keyring.generate();
  return {
    publicKey: keyring._address,
    privateKey: keyring._key._privateKey
  }
}

/*
    @ dev : Add a Service into DID Document
    @ desc : DID Document에 서비스를 추가합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param id : Service Id. 인증서 일련번호
    @param pubKey : 인증서를 복호화하는데 사용될 pem PublicKey.
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const addService = async (did, id, pubKey, signKey) => {
  let keyring;

  const keyringFromPrivateKey = caver.wallet.keyring.createFromPrivateKey(
  signKey
  );
  caver.wallet.add(keyringFromPrivateKey);
  keyring = keyringFromPrivateKey;


  const contractInstance = new caver.contract(
    abi,
    contractAddress
  );
  await contractInstance.methods
    .addService(
      did,id,pubKey
    )
    .send({
      from: keyring._address,
      gas: "7500000",
    });
}

const getAllService = async (did) => {
    const contractInstance = new caver.contract(
        abi,
        contractAddress
      );
    const temp = await contractInstance.methods
    .getAllService(did).call();
    return temp;
};

const getPemPubKey = async (did) => {
     const contractInstance = new caver.contract(
        abi,
        "0xf95BA0302Bc3a97A89F8d2532C08888d08e2dc80"
      );
    const temp = await contractInstance.methods
    .getAllService(did).call();

    const res = temp.reduce((res,cur,idx)=>{
      if(cur[0]=='registeredId'){
        return cur[1];
      }
    },'')
    return res;
};

const getDocument = async (did) => {
    const contractInstance = new caver.contract(
        abi,
        contractAddress
      );
    const temp = await contractInstance.methods
    .getDocument(did).call();
    return temp;
};

module.exports = {genWallet, getDocument , getAllService, addService, getPemPubKey};