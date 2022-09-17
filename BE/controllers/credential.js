const VerifiableCredential = require("../models/VerifiableCredential");
const IssuerUserList = require("../models/IssuerUserList");
const Holder = require("../models/Holder");
const VerifyList = require("../models/VerifyList");
const Verifier = require("../models/Verifier");
const HolderVC_List = require("../models/HolderVC_List");
const createError = require("../utils/Error");
const Issuer = require("../models/Issuer");
const KeyPairs = require("../models/KeyPairs");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");
const {
  addHash,
  getProof,
  getAllService,
  verifyVC,
} = require("../utils/UseCaver");

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
      const issuer = await Issuer.findById(req.params.issuerId);

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

      // Verifiable Credential 발급
      const VC = {
        sub: `did:klay:${candidate.walletAddress.slice(2)}`,
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
      // const dec_SigendVC = new Uint8Array(Buffer.from(enc_SignedVC, 'hex'))
      // console.log('dec_SigendVC : ', dec_SigendVC);

      try {
        // DID Document
        const holderDID = "did:klay:" + candidate.walletAddress.slice(2);
        const IssuerDID = "did:klay:" + issuer.walletAddress.slice(2);
        const VC_tileNameType =
          "/" +
          VC_Info.credentialTitle +
          "/" +
          VC_Info.credentialType +
          "/" +
          VC_Info.credentialName;

        // Issuer DID Document Update
        await addHash(
          IssuerDID,
          holderDID + VC_tileNameType,
          "",
          process.env.PRIVATE_KEY_KAIKAS
        );

        // Holder DID Document Update
        await addHash(
          holderDID,
          holderDID + VC_tileNameType,
          enc_SignedVC,
          process.env.PRIVATE_KEY_KAIKAS
        );
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
      const holderVC_List = await HolderVC_List.findById(req.body.vc_list);

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
        console.log(error);
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
        console.log(error);
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
        console.log(err);
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
        console.log(err);
      }

      // 결과값 반환
      if (verifyFactor.every((item) => item)) {
        res.status(200).json("success");
      } else {
        res.status(200).json("Failed");
      }
    } catch (error) {
      console.log(error);
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

const createVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const issuer = await Issuer.findById(req.user.id);

      const newVerifiableCredential = new VerifiableCredential({
        ...req.body,
        ownerId: req.user.id,
        IssuedBy: issuer.title,
      });

      await newVerifiableCredential.save();

      res.status(200).json("Verifiable Credential이 생성되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Update Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 업데이트 할 수 있습니다.
    @ subject : Issuer
*/

const updateVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.findById(req.params.vcId);

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      const updatedVC = await VerifiableCredential.findByIdAndUpdate(
        req.params.vcId,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json("VC가 성공적으로 업데이트 되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Delete Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 삭제 할 수 있습니다.
    @ subject : Issuer
*/
const deleteVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.findById(req.params.vcId);

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }
      await VerifiableCredential.findByIdAndDelete(req.params.vcId);

      res.status(200).json("VC가 성공적으로 삭제 되었습니다.");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

/*
    @ dev : Get Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 출력 할 수 있습니다.
    @ subject : Issuer
*/
const getVerifiableCredential = async (req, res, next) => {
  if (req.user.type === "issuer") {
    try {
      const vc = await VerifiableCredential.findById(req.params.vcId);

      if (vc.ownerId !== req.user.id) {
        next(createError(403, "인가되지 않은 접근입니다."));
      }

      res.status(200).json(vc);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "인가되지 않은 접근입니다."));
  }
};

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
