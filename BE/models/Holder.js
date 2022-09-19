const mongoose = require("mongoose");

const HolderSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
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
    },
    birthDay: {
      type: Date,
      required: true,
    },
    IssuerList : {
      type : Array,
      reqruied : true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Holder", HolderSchema);
