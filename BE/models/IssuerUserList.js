const mongoose = require("mongoose");

const IssuerUserListSchema = new mongoose.Schema(
  {
    organizationId: {
      type: String,
      required: true,
    },
    cr1_name: {
      type: String,
    },
    cr2_birthDate: {
      type: Date,
    },
    cr3_certificateType: {
      type: String,
    },
    cr4_certificateDate: {
      type: Date,
    },
    cr5_Nationality: {
      type: String,
    },
    cr6_address: {
      type: String,
    },
    cr7_isAdult: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IssuerUserList", IssuerUserListSchema);
