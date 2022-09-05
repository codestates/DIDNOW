const mongoose = require("mongoose");

const HolderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    walletAddress: {
      type: String,
      required: true,
      unique: true,
    },
    birthDay: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Holder", HolderSchema);
