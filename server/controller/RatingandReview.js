const RatingAndReviews = require("../Models/RatingAndReviews");
const Course = require("../Models/Course");
const { default: mongoose } = require("mongoose");

//create rating and review

exports.createRating = async(req,res)=>{
    try {
        
        //get user id
        const userid = req.user.id;
        //get data and course id from req body
        const {rating,review,courseid} = req.body;
        //validate ->like student enrolled in that course and already reviewed or not

        //elemMatch for matching elements on any query
        const coursedetails = await Course.findOne({_id:courseid
            ,studentEnrolled:{$elemMatch:{$eq:userid},}
        });

        if(!coursedetails)
        {
            return res.status(404).json({
                sucsess:false,
                message:"User not enrolled in this course",
            })
        }

        const alreadyreview = await RatingAndReviews.findOne({user:userid,course:courseid});
        if(alreadyreview)
        {
            return res.status(401).json({
                sucsess:false,
                message:"User already reviewed this course",
            })
        }
        //update in course schema and create in db

        const ratingreview = await RatingAndReviews.create({rating,review,course:courseid,user:userid});

        const updatedcourse = await Course.findByIdAndUpdate({_id:courseid},
            {
                $push:{ratingAndReviews:ratingreview._id},
            },
            {new:true}
        );

        return res.status(200).json({
            sucsess:true,
            message:"rating created sucsessfully",
            rating:ratingreview,
        })


    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"issue with creation of rating review",
        })
    }
}

//get average rating

exports.getAverageRating = async(req,res)=>{
    try {
        
        const {courseid}  = req.body;

        const result = await RatingAndReviews.aggregate([
            {
                $match:{
                    course:new mongoose.Schema.Types.ObjectId(courseid),
                }
            },
            {
                $group:{
                    _id:null,
                    averagerating:{$avg:"$rating"}
                }
            }
        ]);


        if(result.length > 0)
        {
            return res.status(200).json({
                sucsess:true,
                averagerating:result[0].averagerating,
            })
        }

        return res.status(200).json({
            sucsess:true,
            averagerating:0,
        })
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error with avg rating generation"
        })
    }
}

//get all ratings and reviews

exports.getAllRating = async(req,res)=>{
    try {

        const allrating = await RatingAndReviews.find({}).sort({rating:"desc"}).
        populate({
            path:"user",
            select:"FirstName LastName email image",

        }).populate({
            path:"course",
            select:"courseName",
        }).exec();

        return res.status(200).json({
            sucsess:true,
            message:"All rating fetched sucsessfully",
            data:allrating,
        })
        
    } catch (error) {
        
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while all rating fetxhing "
        })
    }
}
