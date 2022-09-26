const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");

// Verifier Router 7개
const {
  updateVerifier,
  deleteVerifier,
  getVerifier,
  getAllVerifiers,
} = require("../controllers/Verifier");

/*
    @ dev : update Verifier
    @ desc : Verifier 정보를 업데이트 합니다.
    @ subject : Verifier
*/
router.put("/:verifierId", verifyToken, updateVerifier);

/*
    @ dev : delete Verifier
    @ desc : Verfier을 삭제합니다.
    @ subject : Verifier
*/
router.delete("/:verifierId", verifyToken, deleteVerifier);

/*
    @ dev : get a Verifier
    @ desc : 특정 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get("/:verifierId", verifyToken, getVerifier);

/*
    @ dev : get All Verifiers
    @ desc : 모든 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get("/find/all", getAllVerifiers);

module.exports = router;
