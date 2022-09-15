const { generateKeyPairSync } = require("node:crypto");
const crypto = require("crypto");
const { randomBytes } = require("crypto");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')

/* SECP256K1 비밀키 생성 함수 */
function getPrivateKey() {
  while (true) {
    const privKey = randomBytes(32);
    if (secp256k1.privateKeyVerify(privKey)) return privKey;
  }
}
const genKey = () => {
  try {
    const privateKey = getPrivateKey();
    const publicKey = secp256k1.publicKeyCreate(privateKey);
    return {
      privateKey : JSON.stringify(privateKey), 
      publicKey : JSON.stringify(publicKey)
    }
  } catch (error) {
    console.log(error);
  }
};


// const genPrivateKey = (k) => {
//   const key = crypto.createPrivateKey({
//     key: k,
//     format: "pem",
//     passphrase: "top secret",
//   });
//   return key;
// };

  // try {
  //   const { publicKey, privateKey } = generateKeyPairSync("rsa", {
  //     modulusLength: 4096,
  //     publicKeyEncoding: {
  //       type: "spki",
  //       format: "pem",
  //     },
  //     privateKeyEncoding: {
  //       type: "pkcs8",
  //       format: "pem",
  //       cipher: "aes-256-cbc",
  //       passphrase: "top secret",
  //     },
  //   });
    
  //   return { publicKey, privateKey};
  // } catch (error) {
  //   console.log(error)
  // }


// // TEST
// const {publicKey, privateKey} = genKey();

// // console.log(publicKey);
// // console.log(privateKey);

// const data = "hello world"


// // 암호화
// const cryt = crypto.publicEncrypt(publicKey, Buffer.from(data))
// const cryptResult = cryt.toString("base64");
// console.log(cryptResult)

// // 복호화
// const dcrypt = crypto.privateDecrypt(
//   genPrivateKey(privateKey),
//   Buffer.from(cryptResult, "base64")
// );
// const dcryptResult = dcrypt.toString('utf8');
// console.log(dcryptResult)

module.exports = {genKey};
