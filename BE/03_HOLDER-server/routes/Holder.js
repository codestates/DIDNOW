const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");
const passwordCheck = require("../utils/passwordCheck");
const {
  updateHolder,
  deleteHolder,
  getHolder,
  getAllHolders,
} = require("../controllers/Holder");

/*
    @ dev : update Holder
    @ desc : Verifier 정보를 업데이트 합니다.
    @ subject : Verifier
*/
router.put("/:holderId", verifyToken, updateHolder);

/*
    @ dev : delete Holder
    @ desc : Holder을 삭제합니다.
    @ subject : Holder
*/
router.delete("/:holderId", verifyToken, deleteHolder);

/*
    @ dev : get a Holder
    @ desc : 특정 Holder를 출력합니다.
    @ subject : Holder
*/
router.get("/:holderId", verifyToken, getHolder);

/*
    @ dev : get All Holders
    @ desc : 모든 Holder를 출력합니다.
    @ subject : Holder
*/
router.get("/find/all", verifyToken, getAllHolders);

module.exports = router;
