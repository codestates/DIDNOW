const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const passwordCheck = require("../utils/passwordCheck");
const {
  getHolderVCList,
  deleteHolderVCList,
  requestVC,
  createVerifyRequest,
  deleteVerifyRequest
} = require("../controllers/Verify");

/*
    @ dev : Get VC
    @ desc : 사용자가 가진 VC List를 출력합니다. 
    @ subject : Holder
*/
router.get("/vc-list", verifyToken, getHolderVCList);

/*
    @ dev : Delete VC
    @ desc : 사용자가 가진 VC List를 삭제합니다. 
    @ subject : Holder
*/
router.delete(
  "/vc-list/:holdervcId",
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
router.post("/request/:issuerId", verifyToken, passwordCheck, requestVC);

/*
    @ dev : Authentication Request From Holder to Verifer
    @ desc : Verifier에게 인증을 요청합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
*/
router.post(
  "/request-auth/:verifierId",
  verifyToken,
  passwordCheck,
  createVerifyRequest
);

/*
    @ dev : Delete VerifyList To Verifier
    @ desc : Verifier에게 요청한 인증을 삭제합니다.
        - params로 인증받고자 하는 verifier를 특정합니다.
    @ subject : Holder
*/
router.delete(
  "/request-auth/:holderId",
  verifyToken,
  passwordCheck,
  deleteVerifyRequest
);

module.exports = router;
