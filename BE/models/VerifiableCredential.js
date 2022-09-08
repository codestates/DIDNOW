const mongoose = require("mongoose");

const VerifiableCredentialSchema = new mongoose.Schema(
  {
    ownerId: {
      type: String,
      required: true,
    },
    credentialTitle: {
      type: String,
      required: true,
    },
    credentialType : {
        type : String,
        required : true,
    },
    credentialName : {
        type : String,
        required : true,
    },
    IssuedBy: {
      type: String,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("VerifiableCredential", VerifiableCredentialSchema);
