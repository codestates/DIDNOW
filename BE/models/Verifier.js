const mongoose = require('mongoose')

const VerifierSchema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
    },
    title : {
        type : String,
        required : true,
    },
    verifyList : {
        type : Array, // [졸업증명서, 성인인증서, ]
        required : true,
    }
},{
    timestamps : true,
})


module.exports = mongoose.model("Verifier", VerifierSchema);