const { generateKeyPairSync } = require("node:crypto");
const crypto = require("crypto");
const { randomBytes } = require("crypto");
const secp256k1 = require("secp256k1");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

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
      privateKey: privateKey.toString("hex"),
      publicKey: Buffer.from(publicKey).toString("hex"),
    };
  } catch (error) {
    // console.log(error);
  }
};

const genKeyTest = () => {
  try {


    const str = "안녕하세요";

    const privateKey = getPrivateKey();
    const publicKey = secp256k1.publicKeyCreate(privateKey);

    // console.log(privateKey)
    // console.log(publicKey)

    // DB 저장
    const enc_privateKey = privateKey.toString("hex");
    const enc_publicKey = Buffer.from(publicKey).toString("hex");

    // console.log(enc_privateKey)
    // console.log(enc_publicKey)

    // DB 불러오기
    const dec_privateKey = Buffer.from(enc_privateKey, 'hex');
    const dec_publicKey = new Uint8Array(Buffer.from(enc_publicKey, 'hex')) 


    // console.log(dec_privateKey);
    // console.log(dec_publicKey);

    // 해시
    let hash = CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex);

    // 암호화
    const sigObj = secp256k1.ecdsaSign(Buffer.from(hash, "hex"), dec_privateKey);

    // console.log(sigObj);

    // 복호화
    const result = secp256k1.ecdsaVerify(
      // sigObj.signature,
      sigObj.signature,
      Buffer.from(
        CryptoJS.SHA256(str).toString(CryptoJS.enc.Hex),
        "hex"
      ),
      dec_publicKey
    )

    // console.log(result);


  } catch (error) {
    // console.log(error);
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

module.exports = { genKey };
