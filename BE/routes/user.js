const verifyToken = require('../utils/VerifyToken');
const router = require('express').Router();
const {
    updateIssuer,
    deleteIssuer,
    getIssuer,
    getAllIssuers,
    createIssuerUser,
    deleteIssuerUser,
    updateIssuerUser,
    getIssuerUser,
    getAllIssuerUsers,
    updateVerifier,
    deleteVerifier,
    getVerifier,
    getAllVerifiers,
} = require('../controllers/user')


/*
    @ dev : update Issuer
    @ desc : Issuer를 업데이트 합니다.
    @ subject : Issuer
*/
router.put('/issuer/:issuerId', verifyToken, updateIssuer)

/*
    @ dev : delete Issuer
    @ desc : Issuer를 삭제합니다.
    @ subject : Issuer
*/
router.delete('/issuer/:issuerId', verifyToken, deleteIssuer)

/*
    @ dev : get a Issuer
    @ desc : 특정 Issuer를 가져옵니다. 
    @ subject : Holder
*/
router.get('/issuer/:issuerId', verifyToken, getIssuer)

/*
    @ dev : get All Issuers
    @ desc : 모든 Issuer를 가져옵니다.
    @ subject : Holder
*/
router.get('/issuers', verifyToken, getAllIssuers)

/*
    @ dev : create a Issuer User List
    @ desc : 새로운 Issuer User List를 생성합니다.
    @ subject : Issuer
*/
router.post('/issuer-user/:issuerId', verifyToken, createIssuerUser)

/*
    @ dev : delete a Issuer User List
    @ desc : Issuer User List를 삭제합니다.
    @ subject : Issuer
*/
router.delete('/issuer-user/:issuerUserId', verifyToken, deleteIssuerUser)

/*
    @ dev : update a Issuer User List
    @ desc : Issuer User List를 업데이트 합니다.
    @ subject : Issuer
*/
router.put('/issuer-user/:issuerUserId', verifyToken, updateIssuerUser)

/*
    @ dev : get a Issuer User List
    @ desc : 특정 Issuer User를 출력합니다. 
    @ subject : Issuer
*/
router.get('/issuer-user/:issuerUserId', verifyToken, getIssuerUser)

/*
    @ dev : get All Issuer User Lists
    @ desc : Issuer의 모든 User를 출력합니다.
    @ subject : Issuer
*/
router.get('/issuer-users/:issuerId', verifyToken, getAllIssuerUsers)

/*
    @ dev : update Verifier
    @ desc : Verifier 정보를 업데이트 합니다.
    @ subject : Verifier
*/
router.put('/verifier/:verifierId', verifyToken, updateVerifier)

/*
    @ dev : delete Verifier
    @ desc : Verfier을 삭제합니다.
    @ subject : Verifier
*/
router.delete('/verifier/:verifierId', verifyToken, deleteVerifier)

/*
    @ dev : get a Verifier
    @ desc : 특정 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get('/verifier/:verifierId', verifyToken, getVerifier)

/*
    @ dev : get All Verifiers
    @ desc : 모든 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get('/verifiers', verifyToken, getAllVerifiers)


module.exports = router;