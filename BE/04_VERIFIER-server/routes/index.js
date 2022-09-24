const router = require("express").Router();

const VerifierRouter = require("./Verifier");
const VerifyRouter = require("./Verify");

// Verifier Router 7개

router.use("/verifier", VerifierRouter);
router.use("/verify", VerifyRouter);

module.exports = router;
