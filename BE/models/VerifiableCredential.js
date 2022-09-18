const mongoose = require("mongoose");

const VerifiableCredentialSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
      unique : true,
    },
    credentialTitle: {
      type: String,
      required: true,
    },
    IssuedBy: {
      type: String,
      required: true,
      unique : true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VerifiableCredential", VerifiableCredentialSchema);


