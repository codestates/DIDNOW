const mongoose = require("mongoose");

const IssuerUserListSchema = new mongoose.Schema(
  {
    organizationId: {
      type: String,
      required: true,
    },
    cr_name: {
      type: String,
    },
    cr_email:{
      type : String,
      unique : true,
    },
    cr_birthDate: {
      type: Date,
    },
    cr_certificateType: {
      type: String,
    },
    cr_certificateName: {
      type: String,
    },
    cr_certificateDate: {
      type: Date,
    },
    cr_Nationality: {
      type: String,
    },
    cr_address: {
      type: String,
    },
    cr_isAdult: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("IssuerUserList", IssuerUserListSchema);
