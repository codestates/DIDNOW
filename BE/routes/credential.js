const router = require("express").Router();
const Holder = require("../models/Holder");
const Issuer = require("../models/Issuer");
const KeyPair = require("../models/KeyPairs");
const passwordCheck = require("../utils/passwordCheck");
const verifyToken = require("../utils/VerifyToken");

const {
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
} = require("../controllers/credential");
const VerifiableCredential = require("../models/VerifiableCredential");


/*
    @ dev : Get VC
    @ desc : 사용자가 가진 VC List를 출력합니다. 
    @ subject : Holder
*/
router.get("/get-holder-vc-list", verifyToken, getHolderVCList);

/*
    @ dev : Delete VC
    @ desc : 사용자가 가진 VC List를 삭제합니다. 
    @ subject : Holder
*/
router.delete(
  "/delete-holder-vc-list/:holdervcId",
  verifyToken,
  deleteHolderVCList
);

/*
    @ dev : Request VC Publish FROM Holder to Issuer
    @ desc : Issuer에게 VC 발급을 요청합니다.
        - params로 issuer의 ID를 특정합니다. 
    @ subject : Holder
    @ required : Smart Contract
*/
router.post("/request-vc/:issuerId", verifyToken, passwordCheck, requestVC);

/*
    @ dev : Authentication Request From Holder to Verifer
    @ desc : Verifier에게 인증을 요청합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
*/
router.post(
  "/verifier/request-auth/:verifierId",
  verifyToken,
  passwordCheck,
  createVerifyRequest
);

/*
    @ dev : Get Requested Authentication Request
    @ desc : Holder로 부터 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get("/verifier/:holderId", verifyToken, getVerifyRequest);

/*
    @ dev : Get Requested Authentication Request
    @ desc : 모든 Holder로 부터의 전체 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get("/find/request-auths", verifyToken, getAllVerifyRequest);

/*
    @ dev : Close Authentication From Verifier
    @ desc : Holder로 부터 들어온 인증 요청을 처리+마무리 합니다.    
        - params의 verifiyListId로 요청을 특정합니다.
    @ subject : Verifer
    @ required : Smart Contract
*/
router.post("/auth-vp/:verifiyListId", verifyToken, closeVerifyReqest);

/*
    @ dev : Create Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 생성할 수 있습니다.
    @ subject : Issuer
*/
router.post('/verifiable-credential/', verifyToken , createVerifiableCredential);

/*
    @ dev : Update Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 업데이트 할 수 있습니다.
    @ subject : Issuer
*/
router.put('/verifiable-credential/:vcId', verifyToken, updateVerifiableCredential)

/*
    @ dev : Delete Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 삭제 할 수 있습니다.
    @ subject : Issuer
*/
router.delete('/verifiable-credential/:vcId', verifyToken, deleteVerifiableCredential)

/*
    @ dev : Get Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 출력 할 수 있습니다.
    @ subject : Issuer
*/
router.get('/verifiable-credential/:vcId', verifyToken, getVerifiableCredential)


module.exports = router;
