const { makeFileObjects, storeFiles, retrieveFiles } = require("../utils/ipfs");
const VerifiableCredential = require("../models/VerifiableCredential");
const IssuerUserList = require("../models/IssuerUserList");
const Holder = require("../models/Holder");
const VerifyList = require("../models/VerifyList");
const HolderVC_List = require('../models/HolderVC_List')
const createError = require("../utils/Error");
const jwt = require('jsonwebtoken')
const { getPemPubKey } = require("../utils/UseCaver");
const Issuer = require("../models/Issuer");

/*
    @ dev : Request VC Publish FROM Holder to Issuer
    @ desc : Issuer에게 VC 발급을 요청합니다.
        - params로 issuer의 ID를 특정합니다. 
    @ subject : Holder
    @ required : Smart Contract
*/
const requestVC = async (req, res, next) => {
  if (req.user.type === "holder") {
    try {
      // 현재 로그인한 Holder의 정보로 Holder 검색
      const candidate = await Holder.findById(req.user.id);

      // Holder의 정보로 Issuer에 등록된 IssuerUserList 검색
      const candidateInfo = await IssuerUserList.findOne({
        cr_name: candidate.username,
      });

      // Issuer가 가진 VC 목록 조회
      const VC_Info = await VerifiableCredential.findOne({
        ownerId: req.params.issuerId,
      });

      // Verifiable Credential 발급
      const VC = {
        sub: `did:klay:${candidate.walletAddress}`,
        nbf: 1562950282,
        vc: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          credentialSubject: {
            [VC_Info.credentialTitle]: {
              type: VC_Info.credentialType,
              name: VC_Info.credentialName,
              publisher: VC_Info.IssuedBy,
              userName: candidateInfo.cr_name,
              birthDate: candidateInfo.cr_birthDate,
              typeOf: candidateInfo.cr_certificateType,
              typeDate: candidateInfo.cr_certificateDate,
              nationality: candidateInfo.cr_Nationality,
              address: candidateInfo.cr_address,
              isAdult: candidateInfo.cr_isAdult,
            },
          },
        },
      };

      // 비밀키로 암호화 과정

      // 컨트랙트에 pubKey // updateDIDDocument(pubKey).send({form:Issuerwallet});
      // 이 부분 이제 없어도 되는 걸로 인지.

      // 

      // 

      //

      // IPFS에 VC 저장
      const signedVC = jwt.sign(VC, req.body.password);
      const cid = await storeFiles(makeFileObjects(signedVC, req.body.VC_title), process.env.WEB3STORAGE_TOKEN);
      console.log('cid : ', cid);

      // Holder VC List에 저장
      const newHolderVCList = new HolderVC_List({
        owner : req.user.id,
        title : req.body.VC_title,
        IPFS_Address : cid,
        IssuedBy : req.params.issuerId,
      })
      await newHolderVCList.save();


      res.status(200).json(VC);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Get VC From IPFS
    @ desc : IPFS에 저장된 VC를 읽어옵니다.
        - IPFS는 사용자의 대칭키로 암호화 되어 있습니다.
        - 비밀번호를 요청해야 합니다. 
    @ subject : Holder
    @ required : IPFS module
*/
const getHolderVCList = async (req, res, next) => {
  if (req.user.type === "holder") {
    try {

      // holder가 소유한 모든 VC를 가져옴
      const holderVCList = await HolderVC_List.find({owner : req.user.id});

      // 출력
      res.status(200).json(holderVCList);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

const deleteHolderVCList = async (req, res, next) => {
  if(req.user.type === 'holder'){
    try {
      const holderVcList = await HolderVC_List.findById(req.params.holdervcId);
      if(holderVcList.owner === req.user.id){
          await HolderVC_List.findByIdAndDelete(req.params.holdervcId);
          res.status(200).json("VC가 정상적으로 삭제되었습니다.")
      }else{
        next(next(createError(403, "인가되지 않은 접근입니다.")));
      }
    } catch (error) {
      next(error);
    }
  }else{
    next(createError(403, "인가되지 않은 접근입니다."));
  }
}


/*
    @ dev : Authentication Request From Holder to Verifer
    @ desc : Verifier에게 인증을 요청합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
    @ required : Smart Contract
*/
const createVerifyRequest = async (req, res, next) => {
  if (req.user.type === "holder") {
    try {
      // VP payload 생성
      const vpPayload = {
        vp: {
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation'],
          verifiableCredential: ["vc"]
        }
      }

      // Verify List 생성
      const newVerifyList = new VerifyList({
        ...req.body,
        vp : JSON.stringify(vpPayload),
        requestOwner: req.user.id,
        verifyOwner: req.params.verifierId,
      });
      const savedVerifyList = await newVerifyList.save();
      res.status(200).json(savedVerifyList);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Get Requested Authentication Request
    @ desc : Holder로 부터 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/

const getVerifyRequest = async (req, res, next) => {
  // VerifyList에서 Holder의 정보로 DB Retrieve
  if (req.user.type === "verifier") {
    try {
      const verifyLists = await VerifyList.find({
        requestOwner: req.params.holderId,
      });
      res.status(200).json(verifyLists);
    } catch (error) {
      next(error);
    }
  } else {
    res.status(403).json("인가되지 않은 접근입니다.");
  }
};

/*
    @ dev : Get Requested Authentication Request
    @ desc : 모든 Holder로 부터의 전체 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
const getAllVerifyRequest = async (req, res, next) => {
  if (req.user.type === "verifier") {
    try {
      const verifyLists = await VerifyList.find({ verifyOwner: req.user.id });
      res.status(200).json(verifyLists);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

// 구현 예정 controller
const closeVerifyReqest = async (req, res, next) => {
  if (req.user.type === "verifier") {
    try {

      
      // Verify할 VerifyList를 불러옴
      const verifyList = await VerifyList.findById(req.params.verifiyListId);
      
      // 본인에게 요청된 VerifyList만 인증가능
      if(verifyList.verifyOwner === req.user.id){

        /************/
        //  인증 로직 //
        /************/
        // 1. DID Document에서 PubKey 2개 가져옴
        // 2. jwt.verify(vcJWT) 2번 실행
        // 3. 사용자 정보와 VC내의 정보 비교 검증
        // - body 이름 / birthDate / 
        // 4. 결과에 따라 응답
        /*********************************/

        // DB Wallet테이블에서 홀더와 이슈어의 지갑주소 불러옴
        const holderAddr = "";
        const issuerAddr = "";

        // 지갑주소를 did Id로 치환
        const holderDid = "did:klay:"+holderAddr.slice(2);
        const issuerDid = "did:klay:"+issuerAddr.slice(2);

        // didDocument에서 복호화를 위한 퍼블릭 키 호출
        const holderPubKey = getPemPubKey(holderDid);
        const issuerPubKey = getPemPubKey(issuerDid);
        
        // holder pubKey로 jwt.verify 실행
        let result;
        jwt.verify(verifyList, holderPubKey, (err, data)=>{
            if(err) return next(createError(403, "Invalid Token!"));

            result = data;
            next();
        })

        //issuer pubKey로 jwt.verify 실행
        jwt.verify(result, issuerPubKey, (err, data)=>{
            if(err) return next(createError(403, "Invalid Token!"));

            result = data;
            next();
        })

        // 사용자 정보와 VC내의 정보 비교 검증
        
        // 결과에 따라 응답

        res.status(200).json(JSON.parse(verifyList.vp));
      }else{
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

const saveToIPFS = async (req, res, next) => {
  if (req.user.type === "verifier") {
    try {
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Create Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 생성할 수 있습니다.
    @ subject : Issuer
*/

const createVerifiableCredential =  async (req, res, next)=>{
  if(req.user.type === 'issuer'){
      try {
          const issuer = await Issuer.findById(req.user.id);

          const newVerifiableCredential = new VerifiableCredential({...req.body, ownerId : req.user.id, IssuedBy : issuer.title});

          await newVerifiableCredential.save();

          res.status(200).json("Verifiable Credential이 생성되었습니다.");

      } catch (error) {
          next(error);
      }
  }else{
      next(createError(403, "인가되지 않은 접근입니다."));
  }
}

/*
    @ dev : Update Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 업데이트 할 수 있습니다.
    @ subject : Issuer
*/

const updateVerifiableCredential = async(req, res, next)=>{
  if(req.user.type === 'issuer'){
      try {
          const vc = await VerifiableCredential.findById(req.params.vcId);

          if(vc.ownerId !== req.user.id){
              next(createError(403, "인가되지 않은 접근입니다."));  
          }

          const updatedVC = await VerifiableCredential.findByIdAndUpdate(req.params.vcId, { $set : req.body}, {new:true});

          res.status(200).json("VC가 성공적으로 업데이트 되었습니다.")
      } catch (error) {
          next(error);
      }
  }else{
      next(createError(403, "인가되지 않은 접근입니다."));
  }
}

/*
    @ dev : Delete Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 삭제 할 수 있습니다.
    @ subject : Issuer
*/
const deleteVerifiableCredential = async(req, res, next)=>{
  if(req.user.type === 'issuer'){
      try {
        const vc = await VerifiableCredential.findById(req.params.vcId);

          if(vc.ownerId !== req.user.id){
              next(createError(403, "인가되지 않은 접근입니다."));  
          }
          await VerifiableCredential.findByIdAndDelete(req.params.vcId);

          res.status(200).json("VC가 성공적으로 삭제 되었습니다.")
      } catch (error) {
          next(error);
      }
  }else{
      next(createError(403, "인가되지 않은 접근입니다."));
  }
}


/*
    @ dev : Get Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 출력 할 수 있습니다.
    @ subject : Issuer
*/
const getVerifiableCredential = async(req, res, next)=>{
  if(req.user.type === 'issuer'){
      try {
        const vc = await VerifiableCredential.findById(req.params.vcId);

          if(vc.ownerId !== req.user.id){
              next(createError(403, "인가되지 않은 접근입니다."));  
          }

          res.status(200).json(vc)
      } catch (error) {
          next(error);
      }
  }else{
      next(createError(403, "인가되지 않은 접근입니다."));
  }
}

module.exports = {
  requestVC,
  getVerifyRequest,
  createVerifyRequest,
  getAllVerifyRequest,
  getHolderVCList,
  deleteHolderVCList,
  closeVerifyReqest,
  createVerifiableCredential,
  updateVerifiableCredential,
  deleteVerifiableCredential,
  getVerifiableCredential,
};
