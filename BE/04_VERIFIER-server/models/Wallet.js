const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    ownerOf: {
      type: String,
      required: true,
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallet", WalletSchema);
