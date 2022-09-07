const verifyToken = require('../utils/VerifyToken');
const router = require('express').Router();
const {
    registerIssuer,
    registerHolder,
    registerVerifier,
    loginIssuer,
    loginHolder,
    loginVerifier,
    logout,
    getKeyPair
} = require('../controllers/auth')

/*
    @ dev : Register a Issuer
    @ desc : 새로운 Issuer를 등록합니다.
        -pubKey/privateKey Pair가 생성됩니다.
    @ subject : Issuer
*/ 
router.post('/register-issuer', registerIssuer)

/*
    @ dev : Login a Issuer
    @ desc : Issuer의 로그인 로직
    @ subject : Issuer
*/ 
router.post('/login-issuer', loginIssuer)

/*
    @ dev : Register a Holder
    @ desc : 새로운 Holder를 등록합니다.
        -pubKey/privateKey Pair가 생성됩니다.
    @ subject : Holder
*/ 
router.post('/register-holder', registerHolder)

/*
    @ dev : Login a Holder
    @ desc : Holder의 로그인 로직
    @ subject : Holder
*/ 
router.post('/login-holder', loginHolder)

/*
    @ dev : Register a Verifier
    @ desc : 새로운 Verifier를 등록합니다.
    @ subject : Verifier
*/ 
router.post('/register-verifier', registerVerifier)

/*
    @ dev : Login a Verifier
    @ desc : Verifier의 Login 로직
    @ subject : Verifier
*/ 
router.post('/login-verifier', loginVerifier)

/*
    @ dev : Logout
    @ desc : 
         - Issuer, Holder, Verifier의 로그인 상태를 전환
         - 사용자의 Access Token을 삭제
    @ subject : Common
*/ 
router.post('/logout', verifyToken, logout)

/*
    @ dev : Get keyPair
    @ desc : 
         - Issuer의 keyPair를 가져옵니다.
         - Holder의 keyPair를 가져옵니다.
         - 본인의 keyPair만 조회 가능합니다.
    @ subject : Issuer, Holder
*/ 
router.get('/keypair/:userId', verifyToken, getKeyPair)


module.exports = router;