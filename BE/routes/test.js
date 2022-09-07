const router = require('express').Router();

const KeyPair = require('../models/KeyPairs')
const VerifiableCredential = require('../models/VerifiableCredential')

const crypto = require('crypto')
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/VerifyToken');
const {genKey , genPrivateKey} = require('../utils/keyPairGenerator')

// JWT 토큰 암호화/복호화 테스팅
router.post('/security',verifyToken, async (req, res, next)=>{
    const {pubKey, privateKey} = await KeyPair.findOne({ownerOf : req.user.id});
    
    const key = genPrivateKey(privateKey);

    // JWT Sign (개인키로 암호화)
    const messageSign = jwt.sign(
        {
          sub: "did:klay:0x435df3eda57154cf8cf7926079881f2912f54db4",
          nbf: 1562950282,
          vc: {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            type: ["VerifiableCredential"],
            credentialSubject: {
              degree: {
                type: "BachelorDegree",
                name: "Baccalauréat en musiques numériques",
              },
            },
          },
        },
        key,
        {
          issuer: "AboutTech",
          algorithm: "RS256",
        }
      );
      
      // JWT 복호화(공개키로 복호화)
      const verifiedMessage = jwt.verify(messageSign, pubKey);
      console.log(verifiedMessage)

    res.json({data : verifiedMessage, message : 'success'})
})

router.post('/schema', async (req, res, next)=>{
    try {
        
        const VC = new VerifiableCredential(req.body)
        const savedVC = await VC.save();
        res.json(savedVC)
    } catch (error) {
        next(error);
    }
})

// caver-js 테스트

module.exports = router;

