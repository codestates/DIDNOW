const createError = require("../utils/Error");
const Verifier = require("../models/Verifier");
const VerifyList = require('../models/VerifyList');
const Holder = require("../models/Holder");
const { getProof, getAllService, verifyVC } = require("../utils/UseCaver");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");

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

const closeVerifyReqest = async (req, res, next) => {
  if (req.user.type === "verifier") {
    try {
      /* 
          Close Verify Request 로직
          Verifier가 Holder의 인증요청을 진행
          1. Holder의 VC List를 가져온다 (VC 원본을 보기 위함) [closed]
          2. Holder의 WalletAddress를 가져온다(DID Document 접근용) [closed]
          3. Holder의 DID Document에 접근, publicKey를 가져옴 [closed]
          4. VP를 복호화한다()
          5. 인증 Factor
            1) VerifyList(원본VP) === Holder Document의 pubKey로 복호화 => Boolean
            2) hash(원본VC) === Holder Document의 VC를 Issuer의 publicKey로 복호화 =>Boolean
            3) Issuer DID Document에 Holder의 ID 확인
            4) Verifier가 검증할 인증서종류 일치여부 확인
        */

      // Verify할 VerifyList를 불러옴
      const verifyList = await VerifyList.findById(req.params.verifiyListId);

      // Holder/ Verifier 특정
      const holder = await Holder.findById(verifyList.requestOwner);
      const verifier = await Verifier.findById(verifyList.verifyOwner);

      // 본인에게 요청된 VerifyList만 인증가능
      if (verifyList.verifyOwner !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      // Holder PubKey로 VP 복호화(DID Document에 접근 후 pubKey 사용)
      // Holder DID Document에 접근하기 위한 Wallet Address
      const HolderDID = `did:klay:${holder.walletAddress.slice(2)}`;

      // Holder DID Document에서 Proof를 가져옴
      const HolderPubKey = await getProof(HolderDID);

      // Holder PubKey Decoding
      const decodedHolderPubKey = new Uint8Array(
        Buffer.from(HolderPubKey, "hex")
      );

      const IssuerDID = verifyList.originalVP[0].vp.pubKey.filter(
        (item) => item.type === "ISSUER"
      )[0].id;
      const vcId_address = verifyList.originalVP[0].vp.pubKey.filter(
        (item) => item.type === "HOLDER"
      )[0].id;

      const vc_In_VP =
        verifyList.originalVP[0].vp.verifiableCredential[0].vc
          .credentialSubject;

      const vcId_title = Object.keys(vc_In_VP);
      const vcId_type = vc_In_VP[vcId_title[0]].type;
      const vcId_name = vc_In_VP[vcId_title[0]].name;

      const verifyFactor = [];

      try {
        /* 인증 Factor.1 */
        // Holder의 디지털 서명 복호화 확인
        const factor_01 = secp256k1.ecdsaVerify(
          new Uint8Array(Buffer.from(verifyList.vp, "hex")), //DID Document에서 가져온 데이터
          Buffer.from(
            CryptoJS.SHA256(JSON.stringify(verifyList.originalVP[0])).toString(
              CryptoJS.enc.Hex
            ),
            "hex"
          ),
          decodedHolderPubKey
        );
        verifyFactor[0] = factor_01;
      } catch (error) {
        verifyFactor[0] = false;
        // console.log(error);
      }

      try {
        /* Factor.2 */
        // Issuer의 디지털 서명 복호화
        // Holder(VC) === Issuer PubKey로 복호화 (Boolean)
        // const holderVC = await HolderVC_List.findOne({owner : holder._id});

        const encryptedAllHolderVC = await getAllService(HolderDID);
        const IssuerPubKey = await getProof(IssuerDID);

        // Issuer PubKey 디코딩
        const decodedIssuerPubKey = new Uint8Array(
          Buffer.from(IssuerPubKey, "hex")
        );
        const encryptedHolderVC = encryptedAllHolderVC.filter((item) => {
          const vcIdFromDID = item.id.split("/");

          return (
            vcIdFromDID[0] === vcId_address &&
            vcIdFromDID[1] === vcId_title[0] &&
            vcIdFromDID[2] === vcId_type &&
            vcIdFromDID[3] === vcId_name
          );
        });

        // 디지털 서명 검증 2단계 : 암호화된 VC 검증
        const factor_02 = secp256k1.ecdsaVerify(
          new Uint8Array(Buffer.from(encryptedHolderVC[0].value, "hex")), //DID Document에서 가져온 데이터
          Buffer.from(
            CryptoJS.SHA256(
              JSON.stringify(
                verifyList.originalVP[0].vp.verifiableCredential[0]
              )
            ).toString(CryptoJS.enc.Hex),
            "hex"
          ),
          decodedIssuerPubKey
        );
        verifyFactor[1] = factor_02;
      } catch (error) {
        verifyFactor[1] = false;
        // console.log(error);
      }

      try {
        /* Factor 3 */
        // Issuer DID Document에 Holder의 ID 확인
        const factor_03 = await verifyVC(
          IssuerDID,
          vcId_address +
            "/" +
            vcId_title[0] +
            "/" +
            vcId_type +
            "/" +
            vcId_name,
          "",
          process.env.PRIVATE_KEY_KAIKAS
        );
        verifyFactor[2] = factor_03;
      } catch (err) {
        verifyFactor[2] = false;
        // console.log(err);
      }

      try {
        /* factor_04 VC Title 검증 */
        // Verifier가 검증할 인증서종류 일치여부 확인
        const factor_04 = verifier.verifyList.some((item) => {
          return vcId_title[0] === item;
        });
        verifyFactor[3] = factor_04;
      } catch (err) {
        verifyFactor[3] = false;
        // console.log(err);
      }

      // 결과값 반환
      // console.log(verifyFactor);
      let resultVerify = "";
      if (verifyFactor.every((item) => item)) {
        resultVerify = "success";
        res.status(200).json("success");
      } else {
        resultVerify = "failed";
        res.status(200).json("Failed");
      }

      // New Verify List 생성
      await VerifyList.findByIdAndUpdate(
        req.params.verifiyListId,
        {
          $set: {
            status: resultVerify,
          },
        },
        { new: true }
      );
    } catch (error) {
      // console.log(error);
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

module.exports = {
  getVerifyRequest,
  getAllVerifyRequest,
  closeVerifyReqest,
};
