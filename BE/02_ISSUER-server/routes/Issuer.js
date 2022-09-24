const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");

const {
    updateIssuer,
    deleteIssuer,
    getIssuer,
    getAllIssuers,
} = require("../controllers/Issuer");


/*
    @ dev : update Issuer
    @ desc : Issuer를 업데이트 합니다.
    @ subject : Issuer
*/
router.put("/:issuerId", verifyToken, updateIssuer);

/*
    @ dev : delete Issuer
    @ desc : Issuer를 삭제합니다.
    @ subject : Issuer
*/
router.delete("/:issuerId", verifyToken, deleteIssuer);

/*
    @ dev : get a Issuer
    @ desc : 특정 Issuer를 가져옵니다. 
    @ subject : Holder
*/
router.get("/:issuerId", verifyToken, getIssuer);

/*
    @ dev : get All Issuers
    @ desc : 모든 Issuer를 가져옵니다.
    @ subject : Holder
*/
// Holder가 모든 Issuer를 출력해야됨
router.get("/find/all", getAllIssuers);


module.exports = router;