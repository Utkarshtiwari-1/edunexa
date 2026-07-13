const mongoose = require("mongoose");

const ratingAndReviewsschema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
        trim:true,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        index:true,
        required:true,
    }
})

module.exports = mongoose.model("RatingAndReviews",ratingAndReviewsschema);