const mongoose = require("mongoose");

const VerifyListSchema = new mongoose.Schema(
  {
    requestOwner: {
      type: String,
      required: true,
    },
    verifyOwner: {
      type: String,
      required: true,
    },
    originalVP: {
      type: Array,
    },
    vp: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "status",
    },
    requestAt: {
      type: Date,
      default: new Date(),
    },
    completeAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VerifyList", VerifyListSchema);
