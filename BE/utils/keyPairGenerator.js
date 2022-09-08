const { generateKeyPairSync } = require("node:crypto");
const crypto = require("crypto");

const genPrivateKey = (k) => {
  const key = crypto.createPrivateKey({
    key: k,
    format: "pem",
    passphrase: "top secret",
  });
  return key;
};

const genKey = () => {
  try {
    const { publicKey, privateKey } = generateKeyPairSync("rsa", {
      modulusLength: 4096,
      publicKeyEncoding: {
        type: "spki",
        format: "pem",
      },
      privateKeyEncoding: {
        type: "pkcs8",
        format: "pem",
        cipher: "aes-256-cbc",
        passphrase: "top secret",
      },
    });
    
    return { publicKey, privateKey};
  } catch (error) {
    console.log(error)
  }
};



module.exports = {genKey , genPrivateKey};
