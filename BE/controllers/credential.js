const { makeFileObjects, storeFiles, retrieveFiles } = require("../utils/ipfs");
const VerifiableCredential = require("../models/VerifiableCredential");
const IssuerUserList = require("../models/IssuerUserList");
const Holder = require("../models/Holder");
const VerifyList = require("../models/VerifyList");
const Verifier = require("../models/Verifier");
const HolderVC_List = require("../models/HolderVC_List");
const createError = require("../utils/Error");
const jwt = require("jsonwebtoken");
const { getPemPubKey } = require("../utils/UseCaver");
const Issuer = require("../models/Issuer");
const KeyPairs = require("../models/KeyPairs");
const axios = require("axios");
const { genKey, genPrivateKey } = require("../utils/keyPairGenerator");
const crypto = require("crypto");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");
const { addHash, getProof } = require("../utils/UseCaver");

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

      // Issuer가 가진 VC 조회
      const VC_Info = await VerifiableCredential.findOne({
        ownerId: req.params.issuerId,
      });

      // Verifiable Credential 발급
      const VC = {
        sub: `did:klay:${candidate.walletAddress}`,
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

      /*
        0. Hash 돌리고 (close)
        1. VC issuer 비밀키로 암호화  (close)
        2. Holder의 DID Document Update || const addHash = async (did, id, hash, signKey) => {
        3. Verify 요청 할 때 
          - 파일 가져오고
          - VP에다가 VC를 배열로 담는다
        4. Verifier가 holder, issure의 DID Doc을 보고 검증을 진행
      */

      // VC Hash
      let hashedVC = CryptoJS.SHA256(JSON.stringify(VC)).toString(
        CryptoJS.enc.Hex
      );

      // Issuer의 KeyPair search
      const IssuerKeypair = await KeyPairs.findOne({
        ownerOf: req.params.issuerId,
      });

      // DB에서 가져올 때 JSON.parse 작업
      const IssuerPrivateKey = Buffer.from(
        JSON.parse(IssuerKeypair.privateKey)
      );

      // Issuer의 비밀키로 암호화
      const signedVC = secp256k1.ecdsaSign(
        Buffer.from(hashedVC, "hex"),
        IssuerPrivateKey
      );
      
      const newSignedVC = JSON.stringify(signedVC.signature);

      try {
        // DID Document
        const did = "did:klay:" + candidate.walletAddress.slice(2);
        const VC_tileNameType =
          VC_Info.credentialTitle +
          VC_Info.credentialType +
          VC_Info.credentialName;
        await addHash(
          did,
          did + VC_tileNameType,
          newSignedVC,
          process.env.PRIVATE_KEY_KAIKAS
        );
      } catch (err) {
        console.log(err);
      }

      // const arrSignedVC = signedVC.split("");
      // const arrsignedVCFinal = [];
      // const pubKeyHolder = await KeyPairs.findOne({ ownerOf: req.user.id });

      // while(arrSignedVC.length > 0) {
      //   const temp = arrSignedVC.splice(0, 350);

      //   // Holder의 공개키로 암호화
      //   const cryptData = crypto.publicEncrypt(
      //     pubKeyHolder.pubKey,
      //     Buffer.from(temp.join(""))
      //   );

      //   arrsignedVCFinal.push(cryptData);
      // }

      // // IPFS에 VC 저장
      // const cid = await storeFiles(
      //   makeFileObjects(arrsignedVCFinal, req.body.VC_title),
      //   process.env.WEB3STORAGE_TOKEN
      // );

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
        4. VerifyList Schema 업데이트
      */


      // Body에 VC id를 태워 보낸다
      const holderVC_List = await HolderVC_List.findById(req.body.vc_list);

      // // IPFS에서 파일을 가져온다
      // const hashedVC = await axios({
      //   url: `https://${holderVC_List.IPFS_Address}.ipfs.w3s.link/${holderVC_List.title}.json`,
      //   method: "GET",
      // });

      // Holder + Verifier KeyPair 준비
      const HolerKeyPair = await KeyPairs.findOne({
        ownerOf: req.user.id,
      });

      // const VerifierKeyPair = await KeyPairs.findOne({
      //   ownerOf: req.params.verifierId,
      // });

      // Holder의 비밀키로 복호화 진행

      // let uncryptVC = "";

      // for (let i = 0; i < hashedVC.data.length; i++) {
      //   const dcrypt = crypto.privateDecrypt(
      //     genPrivateKey(HolerKeyPair.privateKey),
      //     Buffer.from(hashedVC.data[i].data)
      //   );
      //   uncryptVC += dcrypt.toString("utf8");
      // }

      // Issuer PubKey 복호화
      // const KeyIssuer = await KeyPairs.findOne({ownerOf : "6317ff69b388d15aef639f3d"});
      // const verifiedData = jwt.verify(uncryptVC, KeyIssuer.pubKey);
      // console.log(verifiedData);

      // 해당 VC의 Issuer+Holder 특정
      const issuer = await Issuer.findById(holderVC_List.IssuedBy);
      const holder = await Holder.findById(holderVC_List.owner);

      // VP payload 생성
      const vpPayload = {
        vp: {
          pubKey: [
            {
              id: `did:klay:${issuer.walletAddress}`,
              type: "ISSUER",
            },
            {
              id: `did:klay:${holder.walletAddress}`,
              type: "HOLDER",
            },
          ],
          "@context": ["https://www.w3.org/2018/credentials/v1"],
          type: ["VerifiablePresentation"],
          verifiableCredential: [...holderVC_List.originalVC],
        },
      };

      
      // 해시 함수 작동
      let hashedVP = CryptoJS.SHA256(JSON.stringify(vpPayload)).toString(CryptoJS.enc.Hex);
      
      // Holder의 개인키로 암호화 => Verifier의 공개키 암호화
      const newHolderPrivKey = Buffer.from(JSON.parse(HolerKeyPair.privateKey))

      const signedVP = secp256k1.ecdsaSign(Buffer.from(hashedVP, "hex"), newHolderPrivKey);
      console.log(signedVP);
      console.log(JSON.stringify(signedVP.signature))
      //
      // const signedVP = jwt.sign(
      //   vpPayload,
      //   genPrivateKey(HolerKeyPair.privateKey),
      //   {
      //     algorithm: "RS256",
      //   }
      // );



      // Verifier의 공개키 암호화
      // const arrSignedVP = signedVP.split("");
      // const arrsignedVPFinal = [];

      // while (arrSignedVP.length > 0) {
      //   const temp = arrSignedVP.splice(0, 350);

      //   // Verifier의 공개키로 암호화
      //   const cryptData = crypto.publicEncrypt(
      //     VerifierKeyPair.pubKey,
      //     Buffer.from(temp.join(""))
      //   );
      //   arrsignedVPFinal.push(cryptData.toString("hex"));
      // }

      // Verify List 생성
      const newVerifyList = new VerifyList({
        ...req.body,
        originalVP : [vpPayload],
        vp: [JSON.stringify(signedVP.signature)],
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

// 구현 예정 controller
const closeVerifyReqest = async (req, res, next) => {
  // holder가 코드스테이츠 한테 졸업증명서
  // holder가 담배를 사러 가는데, 성인인증
  // verifier가 졸업증명서가 담긴 VC를 받아서 성인인증을 한다 => Failed

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
          1) hash(원본VC) === Holder Document의 VC를 Issuer의 publicKey로 복호화 =>Boolean
          2) 
          3)
          4)
          5)
      */

      // Verify할 VerifyList를 불러옴
      const verifyList = await VerifyList.findById(req.params.verifiyListId);

      // Holder/ Verifier 특정
      const holder = await Holder.findById(verifyList.requestOwner);
      // const verifier = await Verifier.findById(verifyList.verifyOwner);

      // Verifier Key Pair
      // const VerifierKeyPair = await KeyPairs.findOne({
      //   ownerOf: verifier._id,
      // });

      // 본인에게 요청된 VerifyList만 인증가능
      if (verifyList.verifyOwner !== req.user.id) {
        next(createError(403, '인가되지 않은 접근입니다.'));
      }

      // 1. Verifier의 비밀키로 복호화
      // let uncryptVP = "";

      // for (let i = 0; i < verifyList.vp.length + 1; i++) {
      //   try {
      //     const dcrypt = crypto.privateDecrypt(
      //       genPrivateKey(VerifierKeyPair.privateKey),
      //       Buffer.from(verifyList.vp[i], "hex")
      //     );
      //     uncryptVP += dcrypt.toString("utf8");
      //   } catch (error) {}
      // }

      // 2.  Holder PubKey 복호화(DID Document에 접근 후 pubKey 사용)
      /* [블록체인 로직으로 변경 예정] */
      // const HolderKeypair = await KeyPairs.findOne({ ownerOf: holder._id });

      // Holder DID Document에 접근하기 위한 Wallet Address
      const did = `did:klay:${holder.walletAddress.slice(2)}`;

      // Holder DID Document에서 Proof를 가져옴
      const HolderPubKey = await getProof(did);
      console.log('HolderPubKey : ' , HolderPubKey);
      const decodedHolderPubKey  = new Uint8Array(Object.values(JSON.parse(HolderPubKey)))
      console.log('decodedHolderPubKey : ', decodedHolderPubKey)

      const decryptedVP = secp256k1.ecdsaVerify(
        // sigObj.signature,
        new Uint8Array(Object.values(JSON.parse(verifyList.vp[0]))), //DID Document에서 가져온 데이터
        Buffer.from(
          CryptoJS.SHA256(JSON.stringify(verifyList.originalVP[0])).toString(CryptoJS.enc.Hex),
          "hex"
        ),
        decodedHolderPubKey
      )

      console.log(decryptedVP);




      // const verifiedData = jwt.verify(uncryptVP, HolderKeypair.pubKey);
      // console.log(verifiedData);

      // 3.  Issuer PubKey 복호화(DID Document에 접근 후 pubKey 사용)
      /* [블록체인 로직으로 변경 예정] */
      // const IssuerKeypair = await KeyPairs.findOne({
      //   ownerOf: "6317ff69b388d15aef639f3d",
      // });
      // const verifiedData2 = jwt.verify(
      //   verifiedData.vp.verifiableCredential[0],
      //   IssuerKeypair.pubKey
      // );
      // console.log(verifiedData2.vc.credentialSubject);

      // Verify 인증
      /* 
        1. VC 복호화에 정상적으로 성공한 후, 
        2. Verifier의 Verify 리스트에 VC type이 포함되어 있는 경우 성공
        3. 아닌 경우 fail
      */
      // let obj = verifiedData2.vc.credentialSubject;
      // if (verifier.verifyList.includes(obj[Object.keys(obj)[0]].type)) {
      //   console.log("success");
      // } else {
      //   console.log("failed");
      // }

      /* 
        @ dev : 블록체인 로직으로 변경 예정 부분
      
            //   // DB Wallet테이블에서 홀더와 이슈어의 지갑주소 불러옴
            //   const holderAddr = "";
            //   const issuerAddr = "";

            //   // 지갑주소를 did Id로 치환
            //   const holderDid = "did:klay:" + holderAddr.slice(2);
            //   const issuerDid = "did:klay:" + issuerAddr.slice(2);

            //   // didDocument에서 복호화를 위한 퍼블릭 키 호출
            //   const holderPubKey = getPemPubKey(holderDid);
            //   const issuerPubKey = getPemPubKey(issuerDid);

            //   // holder pubKey로 jwt.verify 실행
            //   let result;
            //   jwt.verify(verifyList, holderPubKey, (err, data) => {
            //     if (err) return next(createError(403, "Invalid Token!"));

            //     result = data;
            //     next();
            //   });

            //   //issuer pubKey로 jwt.verify 실행
            //   jwt.verify(result, issuerPubKey, (err, data) => {
            //     if (err) return next(createError(403, "Invalid Token!"));

            //     result = data;
            //     next();
            //   });

            //   // 사용자 정보와 VC내의 정보 비교 검증

            //   // 결과에 따라 응답

            // res.status(200).json(JSON.parse(verifyList.vp));
      */
      res.status(200).json("success");
    } catch (error) {
      console.log(error);
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
