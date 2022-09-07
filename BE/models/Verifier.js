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
    
},{
    timestamps : true,
})


module.exports = mongoose.model("Verifier", VerifierSchema);