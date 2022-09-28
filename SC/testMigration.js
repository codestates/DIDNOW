const Migrations = artifacts.require("Migrations");
const fs = require('fs')

module.exports = function (deployer) {
  deployer.deploy(Migrations) 
    .then(() => {
        if (Migrations._json) {
            fs.writeFile('deployedABI', JSON.stringify(Migrations._json.abi),
                (err) => {
                    if (err) throw err;
                    // console.log('파일에 ABI 입력 성공');
                }
            )

            fs.writeFile('deployedAddress', Migrations.address, 
                (err) => {
                    if (err) throw err;
                    // console.log("파일에 주소입력 성공");
                }
            )
        }
    })
}