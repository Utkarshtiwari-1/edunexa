const mongoose = require("mongoose");

const courseschema = new mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        trim:true,
    },
    courseDescription:{
        type:String,
        required:true,
        trim:true,
    },
    instuctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    whatYouWillLearn:{
        type:String,
        required:true,
        trim:true,
    },
    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    ratingAndReviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReviews",
            
        }
    ],
    Price:{
        type:Number,
        required:true,
    },
    thumbnail:{
        type:String,
       // required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
    },
    tag:{
        type:String,
        trim:true,
    },
    studentEnrolled:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    instructions: {
		type: String,
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    createdAt:{
        type:Date,
        default:Date.now()
    }


    
});

module.exports = mongoose.model("Course",courseschema);