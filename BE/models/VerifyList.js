const mongoose = require('mongoose')

const VerifyListSchema = new mongoose.Schema(
    {
        requestOwner : {
            type : String,
            required : true,
        },
        verifyOwner : {
            type : String,
            required : true,
        },
        status : {
            type : String,
            required : true,
        },
        requestAt : {
            type : Date,
        },
        completeAt : {
            type : Date,
        },
    },{
        timestamps : true,
    }
)


module.exports = mongoose.model("VerifyList", VerifyListSchema);