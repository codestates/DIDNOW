
const router = require("express").Router();
const verifyToken = require("../utils/VerifyToken");

const {
    createVerifiableCredential,
    updateVerifiableCredential,
    deleteVerifiableCredential,
    getVerifiableCredential,
} = require("../controllers/VerifiableCredential");


/*
    @ dev : Create Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 생성할 수 있습니다.
    @ subject : Issuer
*/
router.post('/', verifyToken , createVerifiableCredential);

/*
    @ dev : Update Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 업데이트 할 수 있습니다.
    @ subject : Issuer
*/
router.put('/:vcId', verifyToken, updateVerifiableCredential)

/*
    @ dev : Delete Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 삭제 할 수 있습니다.
    @ subject : Issuer
*/
router.delete('/:vcId', verifyToken, deleteVerifiableCredential)

/*
    @ dev : Get Verifiable Credentil Of Issuer
    @ desc : Issuer는 발급할 VC를 출력 할 수 있습니다.
    @ subject : Issuer
*/
router.get('/', verifyToken, getVerifiableCredential)


module.exports = router;