// Holder Router : 8개

const router = require("express").Router();
const HolderRouter = require("./Holder");
const VerifyRouter = require("./Verify");

router.use("/holder", HolderRouter);
router.use("/verify", VerifyRouter);

module.exports = router;
