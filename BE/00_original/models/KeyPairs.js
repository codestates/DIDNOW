const mongoose = require("mongoose");

const KeyPairsSchema = new mongoose.Schema(
  {
    ownerOf: {
      type: String,
      required: true,
      unique: true,
    },
    pubKey: {
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

module.exports = mongoose.model("KeyPairs", KeyPairsSchema);
