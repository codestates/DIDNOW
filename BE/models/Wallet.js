const mongoose = require("mongoose");

const WalletSchema = new mongoose.Schema(
  {
    ownerOf: {
      type: String,
      required: true,
      unique: true,
    },
    publicKey: {
      type: String,
      required: true,
      unique: true,
    },
    privateKey: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallet", WalletSchema);
