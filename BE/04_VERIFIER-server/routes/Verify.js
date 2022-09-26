const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");

// Verifier Router 7개
const {
  getVerifyRequest,
  getAllVerifyRequest,
  closeVerifyReqest,
} = require("../controllers/Verify");

/*
    @ dev : Get Requested Authentication Request
    @ desc : Holder로 부터 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get("/:holderId", verifyToken, getVerifyRequest);

/*
    @ dev : Get Requested Authentication Request
    @ desc : 모든 Holder로 부터의 전체 인증 요청 목록을 출력합니다.
    @ subject : Verifer
*/
router.get("/find/all", verifyToken, getAllVerifyRequest);

/*
    @ dev : Close Authentication From Verifier
    @ desc : Holder로 부터 들어온 인증 요청을 처리+마무리 합니다.    
        - params의 verifiyListId로 요청을 특정합니다.
    @ subject : Verifer
    @ required : Smart Contract
*/
router.post("/close-vp/:verifiyListId", verifyToken, closeVerifyReqest);

module.exports = router;
