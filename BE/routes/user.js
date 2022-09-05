const verifyToken = require('../utils/VerifyToken');

const router = require('express').Router();

/*
    @ dev : update Issuer
    @ desc : Issuer를 업데이트 합니다.
    @ subject : Issuer
*/
router.put('/:issuerId', verifyToken, )

/*
    @ dev : delete Issuer
    @ desc : Issuer를 삭제합니다.
    @ subject : Issuer
*/
router.delete('/:issuerId', verifyToken, )

/*
    @ dev : get a Issuer
    @ desc : 특정 Issuer를 가져옵니다. 
    @ subject : Holder
*/
router.get('/:issuerId', verifyToken, )

/*
    @ dev : get All Issuers
    @ desc : 모든 Issuer를 가져옵니다.
    @ subject : Holder
*/
router.get('/issuers', verifyToken, )

/*
    @ dev : create a Issuer User List
    @ desc : 새로운 Issuer User List를 생성합니다.
    @ subject : Issuer
*/
router.post('/:issuerId', verifyToken, )

/*
    @ dev : delete a Issuer User List
    @ desc : Issuer User List를 삭제합니다.
    @ subject : Issuer
*/
router.delete('/:issuerUserId', verifyToken, )

/*
    @ dev : update a Issuer User List
    @ desc : Issuer User List를 업데이트 합니다.
    @ subject : Issuer
*/
router.put('/:issuerUserId', verifyToken, )

/*
    @ dev : get a Issuer User List
    @ desc : 특정 Issuer User를 출력합니다. 
    @ subject : Issuer
*/
router.get('/:issuerUserId', verifyToken, )

/*
    @ dev : get All Issuer User Lists
    @ desc : Issuer의 모든 User를 출력합니다.
    @ subject : Issuer
*/
router.get('/issuer-users', verifyToken, )

/*
    @ dev : update Verifier
    @ desc : Verifier 정보를 업데이트 합니다.
    @ subject : Verifier
*/
router.put('/:verifierId', verifyToken, )

/*
    @ dev : delete Verifier
    @ desc : Verfier을 삭제합니다.
    @ subject : Verifier
*/
router.delete('/:verifierId', verifyToken, )

/*
    @ dev : get a Verifier
    @ desc : 특정 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get('/:verifierId', verifyToken, )

/*
    @ dev : get All Verifiers
    @ desc : 모든 Verifier를 출력합니다.
    @ subject : Holder
*/
router.get('/verifiers', verifyToken, )


module.exports = router;