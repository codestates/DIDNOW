const router = require("express").Router();
const IssuerRouter = require("./Issuer");
const IssuerUserRouter = require("./IssuerUserList");
const VerifiableCredentialRouter = require("./VerifiableCredential");

// Issuer Router : 13
router.use("/issuer", IssuerRouter);
router.use("/issuer-user", IssuerUserRouter);
router.use("/verifiable-credential", VerifiableCredentialRouter);

module.exports = router;
