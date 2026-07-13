const mongoose  = require("mongoose");

const userschema = new mongoose.Schema({
    FirstName:{
        type:String,
        required:true,
        trim:true,
    },
    LastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
       
    },
    accountType:{
        type:String,
        required:true,
        enum:["Admin","Student","Instructor"],
    },
    PhoneNumber:{
        type:Number,
        
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile",
        required:true,
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course",
        }
    ],
    token:{
        type:String,
    },
    resetpasswordexpires:{
        type:Date,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    image:{
        type:String,
        required:true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress",
        }
    ],
    

},
{timestamps:true});



module.exports = mongoose.model("User",userschema);
