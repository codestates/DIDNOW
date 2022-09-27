const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");

const {
  createIssuerUser,
  deleteIssuerUser,
  updateIssuerUser,
  getIssuerUser,
  getAllIssuerUsers,
} = require("../controllers/IssuerUserList");

/*
    @ dev : create a Issuer User List
    @ desc : 새로운 Issuer User List를 생성합니다.
    @ subject : Issuer
*/
router.post("/:issuerId", verifyToken, createIssuerUser);

/*
    @ dev : delete a Issuer User List
    @ desc : Issuer User List를 삭제합니다.
    @ subject : Issuer
*/
router.delete("/:issuerUserId", verifyToken, deleteIssuerUser);

/*
    @ dev : update a Issuer User List
    @ desc : Issuer User List를 업데이트 합니다.
    @ subject : Issuer
*/
router.put("/:issuerUserId", verifyToken, updateIssuerUser);

/*
    @ dev : get a Issuer User List
    @ desc : 특정 Issuer User를 출력합니다. 
    @ subject : Issuer
*/

router.get("/:issuerUserId", verifyToken,  getIssuerUser);

/*
    @ dev : get All Issuer User Lists
    @ desc : Issuer의 모든 User를 출력합니다.
    @ subject : Issuer
*/
router.get("/all/:issuerId", verifyToken, getAllIssuerUsers);

module.exports = router;
