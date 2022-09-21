const Caver = require("caver-js");
const caver = new Caver("https://api.baobab.klaytn.net:8651/");
const dotenv = require("dotenv");
dotenv.config();
const contractAddress = process.env.DIDCONTRACT_ADDRESS;

const abi = require("./abi");

// 서버가 실행될 때 서버 프라이빗 키를 월렛에 등록하여 키링을 생성
const serverKeyring = caver.wallet.keyring.createFromPrivateKey(
process.env.PRIVATE_KEY_KAIKAS
);
caver.wallet.add(serverKeyring)

/*
    @ dev : Generate Klaytn Wallet
    @ desc : 임의의 월렛 퍼블릭키와 프라이빗키를 생성합니다.
        - Return {publicKey:"",privateKey:""}
*/
const genWallet = () => {
  keyring = caver.wallet.keyring.generate();
  return {
    WalletPublicKey: keyring._address,
    WalletPrivateKey: keyring._key._privateKey,
  };
};

/*
    @ dev : get PublicKey For Decoding VC
    @ desc : DID Document에 proof를 출력합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param proof : 인증서를 복호화하는데 사용될 pem PublicKey.
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const getProof = async (did) => {
  const contractInstance = new caver.contract(abi, contractAddress);
  const proof = await contractInstance.methods.getProof(did).call();
  return proof;
};

/*
    @ dev : add PublicKey For Decoding VC
    @ desc : DID Document에 proof를 추가합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param proof : 인증서를 복호화하는데 사용될 pem PublicKey.
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const addProof = async (did, proof, signKey) => {
  const sender =
  caver.wallet.keyring.createFromPrivateKey(signKey);

  //월렛이 등록 안되어 있으면 사인키를 월렛에 등록
  try {
    caver.wallet.add(sender);
  } catch (err) {
  }

    const _input = caver.abi.encodeFunctionCall({
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "proofPubKey",
				"type": "string"
			}
		],
		"name": "addProof",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, [did, proof]);

    // Create value transfer transaction
    const executionTx = await caver.transaction.feeDelegatedSmartContractExecution.create({
        from: sender.address,
        feePayer: serverKeyring.address,
        to : contractAddress,
        input: _input,
        gas: 1000000000,
    });

     const signedSender = await caver.wallet.sign(sender.address, executionTx);
     const signed  = await caver.wallet.signAsFeePayer(serverKeyring.address, signedSender);
     const receipt = await caver.rpc.klay.sendRawTransaction(signed);
};


/*
    @ dev : Add VCId And Type For Verifying VC
    @ desc : Issuer DID Document에 서비스를 추가합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param id : 인증서 id(title)                        // 정의 변경 가능
    @param type : 검증/식별을 위한 스트링 값 (did + credentialTitle + name + type )  //정의 변경 가능
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const issueVC = async (did, id, type, signKey) => {
  const sender =
  caver.wallet.keyring.createFromPrivateKey(signKey);

  //월렛이 등록 안되어 있으면 사인키를 월렛에 등록
  try {
    caver.wallet.add(sender);
  } catch (err) {
  }

    const _input = caver.abi.encodeFunctionCall({
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "vcId",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "addVC",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, [did, id, type]);

    // Create value transfer transaction
    const executionTx = await caver.transaction.feeDelegatedSmartContractExecution.create({
        from: sender.address,
        feePayer: serverKeyring.address,
        to : contractAddress,
        input: _input,
        gas: 1000000000,
    });

     const signedSender = await caver.wallet.sign(sender.address, executionTx);
     const signed  = await caver.wallet.signAsFeePayer(serverKeyring.address, signedSender);
     const receipt = await caver.rpc.klay.sendRawTransaction(signed);
};

/*
    @ dev : Add Hash
    @ desc : Holder DID Document에 서비스를 추가합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param id : 인증서 id (string값) (title)                        // 정의 변경 가능
    @param hash : 암호화된 해쉬  //정의 변경 가능
    @param signKey : 요청을 보내는 sender의 Private Key(클레이튼 프라이빗 키)
*/
const addHash = async (did, id, hash, signKey) => {
  const sender =
  caver.wallet.keyring.createFromPrivateKey(signKey);
    debug && console.log(did)
    debug && console.log(sender.address)
    debug && console.log(id)
    debug && console.log(hash)
  //월렛이 등록 안되어 있으면 사인키를 월렛에 등록
  try {
    caver.wallet.add(sender);
  } catch (err) {
  }

    const _input = caver.abi.encodeFunctionCall({
		"constant": false,
		"inputs": [
			{
				"name": "did",
				"type": "string"
			},
			{
				"name": "vcId",
				"type": "string"
			},
			{
				"name": "_hash",
				"type": "string"
			}
		],
		"name": "addVC",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}, [did, id, hash]);
    // Create value transfer transaction
    const executionTx = await caver.transaction.feeDelegatedSmartContractExecution.create({
        from: sender.address,
        feePayer: serverKeyring.address,
        to : contractAddress,
        input: _input,
        gas: 1000000000,
    });

     const signedSender = await caver.wallet.sign(sender.address, executionTx);
     const signed  = await caver.wallet.signAsFeePayer(serverKeyring.address, signedSender);
     const receipt = await caver.rpc.klay.sendRawTransaction(signed);
};

/*
    @ dev : Verify VC
    @ desc : VC가 유효한지 검사합니다.
    @param did : DID Document ID. (did:klay:'publicKey')
    @param id : 인증서 id (string값) (title)                        // 정의 변경 가능
    @param type : 인증을 위한 값 (did + credentialTitle + name + type )  //정의 변경 가능
*/
const verifyVC = async (did, id, type) => {
  const contractInstance = new caver.contract(abi, contractAddress);
  const isExist = await contractInstance.methods.VerifyVC(did, id, type).call();
  return isExist;
};

const getAllService = async (did) => {
  const contractInstance = new caver.contract(abi, contractAddress);
  const temp = await contractInstance.methods.getAllService(did).call();
  return temp;
};

const getPemPubKey = async (did) => {
  const contractInstance = new caver.contract(abi, contractAddress);
  const temp = await contractInstance.methods.getAllService(did).call();
  const res = temp.reduce((res, cur, idx) => {
    if (cur.serviceId == "registeredId") {
      return cur.publicKey;
    }
  }, "");
  debug && console.log(res);
  return res;
};

const getDocument = async (did) => {
  const contractInstance = new caver.contract(abi, contractAddress);
  const temp = await contractInstance.methods.getDocument(did).call();
  return temp;
};

module.exports = {
  genWallet,
  getDocument,
  getAllService,
  getPemPubKey,
  addProof,
  addHash,
  issueVC,
  verifyVC,
  getProof,
};