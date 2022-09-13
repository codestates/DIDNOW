const { Web3Storage, File } = require("web3.storage");
const dotenv = require("dotenv");
dotenv.config();

function getAccessToken() {
  return process.env.WEB3STORAGE_TOKEN;
}

function makeStorageClient(token) {
  return new Web3Storage({
    token: token,
  });
}

function makeFileObjects(obj, title) {
  // You can create File objects from a Buffer of binary data
  // see: https://nodejs.org/api/buffer.html
  // Here we're just storing a JSON object, but you can store images,
  // audio, or whatever you want!
  // obj Example
  

  // const obj = {
  //   sub: "did:klay:0x435df3eda57154cf8cf7926079881f2912f54db4",
  //   nbf: 1562950282,
  //   vc: {
  //     "@context": ["https://www.w3.org/2018/credentials/v1"],
  //     type: ["VerifiableCredential"],
  //     credentialSubject: {
  //       degree: {
  //         type: "BachelorDegree",
  //         name: "Baccalauréat en musiques numériques",
  //       },
  //     },
  //   },
  // };
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [new File([buffer], title)];
  return files;
}

async function storeFiles(files, token) {
  const client = makeStorageClient(token);
  const cid = await client.put(files);
  return cid;
}

// storeFiles()

async function retrieveFiles(cid) {
  const client = makeStorageClient();
  const res = await client.get(cid);
  // console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - [${res.status}] ${res.statusText}`);
  }

  // unpack File objects from the response
  const files = await res.files();
  for (const file of files) {
    console.log(file);
  }
}

module.exports = {
  makeFileObjects,
  storeFiles,
  retrieveFiles,
};

//   retrieveFiles("bafybeia5lusyktqagzsnmnyem6pklpo23z674gytnoopdvyqzelxwgrx2m")

// const axios = require('axios');
// axios({
//     url : "https://bafybeia5lusyktqagzsnmnyem6pklpo23z674gytnoopdvyqzelxwgrx2m.ipfs.w3s.link/vcTest.json"
// }).then(result=>console.log(result.data))
