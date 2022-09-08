const mongoose = require("mongoose");

const HolderVC_ListSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      required: true,
    },
    title : {
      type : String,
      required : true,
    },
    IPFS_Address: {
      type: String,
      required: true,
      unique: true,
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

module.exports = mongoose.model("HolderVC_List", HolderVC_ListSchema);
