const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();
const contractAddress = "0x9BdC1344b8B3773D6d79ed9e254825FE30B217f4";
const testDID = "did:klay:bC14CB49b93Ee36AfdF4b49eCB7C9512f9353c93";

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
        contractAddress
      );
    const temp = await contractInstance.methods
    .getAllService(did).call();
    const res = temp.reduce((res,cur,idx)=>{
      if(cur.serviceId=='res'){
        return cur.publicKey;
      }
    },'')
    // console.log(res)
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