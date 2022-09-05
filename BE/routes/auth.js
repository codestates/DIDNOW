const verifyToken = require('../utils/VerifyToken');

const router = require('express').Router();

/*
    @ dev : Register a Issuer
    @ desc : 새로운 Issuer를 등록합니다.
    @ subject : Issuer
*/ 
router.post('/register-issuer', )

/*
    @ dev : Login a Issuer
    @ desc : Issuer의 로그인 로직
    @ subject : Issuer
*/ 
router.post('/login-issuer', )

/*
    @ dev : Register a Holder
    @ desc : 새로운 Holder를 등록합니다.
    @ subject : Holder
*/ 
router.post('/register-holder', )

/*
    @ dev : Login a Holder
    @ desc : Holder의 로그인 로직
    @ subject : Holder
*/ 
router.post('/login-holder', )

/*
    @ dev : Register a Verifier
    @ desc : 새로운 Verifier를 등록합니다.
    @ subject : Verifier
*/ 
router.post('/register-verifier', )

/*
    @ dev : Login a Verifier
    @ desc : Verifier의 Login 로직
    @ subject : Verifier
*/ 
router.post('/login-verifier', )

/*
    @ dev : Logout
    @ desc : 
         - Issuer, Holder, Verifier의 로그인 상태를 전환
         - 사용자의 Access Token을 삭제
    @ subject : Common
*/ 
router.post('/logout', verifyToken, )



module.exports = router;