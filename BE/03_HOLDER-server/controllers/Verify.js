const Issuer = require("../models/Issuer");
const { addHash } = require("../utils/UseCaver");
const createError = require("../utils/Error");
const Holder = require("../models/Holder");
const HolderVC_List = require("../models/HolderVC_List");
const IssuerUserList = require("../models/IssuerUserList");
const VerifiableCredential = require("../models/VerifiableCredential");
const KeyPairs = require("../models/KeyPairs");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");
const Wallets = require("../models/Wallet");
const VerifyList = require('../models/VerifyList')

/*
    @ dev : Get VC
    @ desc : 사용자가 가진 VC List를 출력합니다. 
    @ subject : Holder
*/
const getHolderVCList = async (req, res, next) => {
  if (req.user.type === "holder") {
    try {
      // holder가 소유한 모든 VC를 가져옴
      const holderVCList = await HolderVC_List.find({ owner: req.user.id });

      // 출력
      res.status(200).json(holderVCList);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
        @ dev : Delete VC
        @ desc : 사용자가 가진 VC List를 삭제합니다. 
        @ subject : Holder
    */
const deleteHolderVCList = async (req, res, next) => {
  if (req.user.type === "holder") {
    try {
      const holderVcList = await HolderVC_List.findById(req.params.holdervcId);
      if (holderVcList.owner === req.user.id) {
        await HolderVC_List.findByIdAndDelete(req.params.holdervcId);
        res.status(200).json("VC가 정상적으로 삭제되었습니다.");
      } else {
        next(next(createError(403, "인가되지 않은 접근입니다.")));
      }
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

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
      let start = new Date();
      /* DB 데이터 읽기 */
      // 현재 로그인한 Holder의 정보로 Holder 검색
      const candidate = await Holder.findById(req.user.id);

      // Holder의 정보로 Issuer에 등록된 IssuerUserList 검색
      const candidateInfo = await IssuerUserList.findOne({
        cr_email: candidate.email,
      });

      // Issuer가 가진 VC 조회
      const VC_Info = await VerifiableCredential.findOne({
        ownerId: req.params.issuerId,
      });

      // Issuer의 KeyPair search
      const IssuerKeypair = await KeyPairs.findOne({
        ownerOf: req.params.issuerId,
      });

      const mid1 = new Date();
      console.log("DB 데이터 읽기 : ", mid1 - start, "ms");

      // Verifiable Credential 발급
      start = new Date();
      const VC = {
        sub: `did:klay:${candidate.walletAddress.slice(2)}`,
        vc: {
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiableCredential"],
          credentialSubject: {
            [VC_Info.credentialTitle]: {
              publisher: VC_Info.IssuedBy,
              type: candidateInfo.cr_certificateType,
              name: candidateInfo.cr_certificateName,
              userName: candidateInfo.cr_name,
              birthDate: candidateInfo.cr_birthDate,
              typeDate: candidateInfo.cr_certificateDate,
              nationality: candidateInfo.cr_Nationality,
              address: candidateInfo.cr_address,
              isAdult: candidateInfo.cr_isAdult,
            },
          },
        },
      };

      // 디지털서명 1단계 : VC Hash
      let hashedVC = CryptoJS.SHA256(JSON.stringify(VC)).toString(
        CryptoJS.enc.Hex
      );

      // 디지털서명 2단계 : Issuer의 비밀키로 암호화
      // DB에서 가져올 때 디코딩
      const IssuerPrivateKey = Buffer.from(IssuerKeypair.privateKey, "hex");
      // Issuer의 비밀키로 암호화
      const signedVC = secp256k1.ecdsaSign(
        Buffer.from(hashedVC, "hex"),
        IssuerPrivateKey
      );

      // 디지털서명 3단계 : 서명된 VC를 인코딩 후 블록체인에 저장
      // 서명된 VC 인코딩
      const enc_SignedVC = Buffer.from(signedVC.signature).toString("hex");

      const mid2 = new Date();
      console.log("Verifiable Credential 발급 : ", mid2 - start, "ms");

      /* Blockchain 접근 */
      try {
        // DID Document
        const holderDID = "did:klay:" + candidate.walletAddress.slice(2);
        const VC_tileNameType =
          "/" +
          VC_Info.credentialTitle +
          "/" +
          candidateInfo.cr_certificateType +
          "/" +
          candidateInfo.cr_certificateName;

        start = new Date();

        //Get Holder PrivateKey
        const holderWallet = await Wallets.findOne({
          ownerOf: req.user.id,
        });
        // Holder DID Document Update
        await addHash(
          holderDID,
          holderDID + VC_tileNameType,
          enc_SignedVC,
          holderWallet.privateKey
        );
        const tx2 = new Date();
        
          console.log("Blockchain 1(addHash(HolderDID)) : ", tx2 - start, "ms");
      } catch (err) {
        console.log(err);
      }

      // Holder VC List에 저장
      const newHolderVCList = new HolderVC_List({
        owner: req.user.id,
        title: req.body.VC_title,
        originalVC: [VC],
        IssuedBy: req.params.issuerId,
      });
      const savedHolderVCList = await newHolderVCList.save();
      
      res.status(200).json(savedHolderVCList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

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
      /* 
            @ Holder가 Verifier에게 인증 요청
            1. Holder의 VC를 가져온다 [closed]
            2. VP를 생성(VC를 포함한) [closed]
            2-2 해시함수 호출 [closed]
            3. Vp를 Holder의 개인키로 디지털 서명을 한다. [closed]
            4. VerifyList Schema 업데이트 [closed]
          */

      // Body에 VC id를 태워 보낸다
      let holderVC_List = await HolderVC_List.findById(req.body.vc_list);

      // Holder + Verifier KeyPair 준비
      const HolerKeyPair = await KeyPairs.findOne({
        ownerOf: req.user.id,
      });

      // 해당 VC의 Issuer+Holder 특정
      const issuer = await Issuer.findById(holderVC_List.IssuedBy);
      const holder = await Holder.findById(holderVC_List.owner);

      // VP payload 생성
      const vpPayload = {
        vp: {
          pubKey: [
            {
              id: `did:klay:${issuer.walletAddress.slice(2)}`,
              type: "ISSUER",
            },
            {
              id: `did:klay:${holder.walletAddress.slice(2)}`,
              type: "HOLDER",
            },
          ],
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiablePresentation"],
          verifiableCredential: [...holderVC_List.originalVC],
        },
      };

      // 디지털서명 1 단계 : 원본 VP 해싱
      let hashedVP = CryptoJS.SHA256(JSON.stringify(vpPayload)).toString(
        CryptoJS.enc.Hex
      );

      // 디지털서명 2 단계 : 해시값 Holder 비밀키 암호화
      // 비밀키FromDB 디코딩
      const newHolderPrivKey = Buffer.from(HolerKeyPair.privateKey, "hex");
      // 비밀키 암호화
      const signedVP = secp256k1.ecdsaSign(
        Buffer.from(hashedVP, "hex"),
        newHolderPrivKey
      );

      // New Verify List 생성
      const newVerifyList = new VerifyList({
        ...req.body,
        originalVP: [vpPayload],
        // 암호화된 VP는 인코딩 후 적재
        vp: Buffer.from(signedVP.signature).toString("hex"),
        requestOwner: req.user.id,
        verifyOwner: req.params.verifierId,
      });
      const savedVerifyList = await newVerifyList.save();

      res.status(200).json({ data: savedVerifyList, message: "success" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Delete VerifyList To Verifier
    @ desc : Verifier에게 요청한 인증을 삭제합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
*/

const deleteVerifyRequest = async (req, res, next) => {
  if (req.params.holderId === req.user.id) {
    try {
      await VerifyList.findByIdAndDelete(req.body.verifyListId);
      res.status(200).json("성공적으로 VerifyList가 삭제되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    return next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
      @ dev : Get Requested Authentication Request
      @ desc : 모든 Holder로 부터의 전체 인증 요청 목록을 출력합니다.
      @ subject : Verifer
  */
      const getAllVerifyRequest = async (req, res, next) => {
        if (req.user.type === "holder") {
          try {
            const verifyLists = await VerifyList.find({ requestOwner: req.user.id });
            res.status(200).json(verifyLists);
          } catch (error) {
            next(error);
          }
        } else {
          next(createError(403, "인가되지 않은 접근입니다."));
        }
      };


module.exports = {
  getHolderVCList,
  deleteHolderVCList,
  requestVC,
  createVerifyRequest,
  deleteVerifyRequest,
  getAllVerifyRequest
};
