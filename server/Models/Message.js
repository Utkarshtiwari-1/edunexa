const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
    },
    LastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
    },
    Countrycode:{
        type:Number,
        required:true,
    },
    Phonenumber:{
        type:Number,
        required:true,
    },
    message:{
        type:String,
        trim:true,
    }
});

module.exports = mongoose.model("Message",MessageSchema);
