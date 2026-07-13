const Course = require("../Models/Course");
const Category = require("../Models/Category");
const {uploadImageToCloudinary} = require("../Utils/imageuploader");
const User = require("../Models/User");
const { default: mongoose } = require("mongoose");
const {convertSecondsToDuration}  = require("../Utils/secToDuration");
const CourseProgress = require("../Models/CourseProgress");

exports.createCourse = async(req,res)=>{
    try {

        const {courseName,courseDescription,whatYouWillLearn
            ,Price,tag,category
        } = req.body;

        const thumbnail = req.files?.thumbnailimage;
        //validation

        if(!courseName || !courseDescription || !whatYouWillLearn || !tag || !Price || !thumbnail
           ){
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            });
         }

        const tagdetails = await Category.findById(category);
        if(!tagdetails)
        {
            return res.status(401).json({
                sucsess:false,
                message:"not a valid tag",
            });
        }

        //upload in cloudinary
        const thumbnailimage = await uploadImageToCloudinary(thumbnail,"Ut");

        //create an entry of new course
        const newcourse = await Course.create({
            courseName,
            courseDescription,
            instuctor:req.user.id,
            whatYouWillLearn,
            tag:tag,
            thumbnail:thumbnailimage.secure_url,
            Price:Price,
            category:tagdetails._id,
        });

        //update in user

        const updateduser = await User.findByIdAndUpdate(req.user.id,
        {
            $push:{courses:newcourse._id}
        },
    {new:true});

    //update in tag schema

    const updatedtag = await Category.findByIdAndUpdate(category,
        {
            $push:{course:newcourse._id}
        },
        {
            new:true,
        }
    );

    return res.status(200).json({
        sucsess:true,
        message:"course created sucsessfully",
        data:newcourse,
    })


        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while course creation",
            error,
           
        })

    }
}


//update course
exports.updateCourse = async(req,res)=>{
    try {

        const {courseId,courseName,courseDescription,whatYouWillLearn
            ,Price,tag,category
        } = req.body;

        const thumbnail = req.files?.thumbnailimage;
        //validation

        console.log("data",{courseId,courseName,courseDescription,whatYouWillLearn
            ,Price,tag,category
        });

        if(!courseName || !courseDescription || !whatYouWillLearn || !tag || !Price
           ){
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            });
         }

        // const tagdetails = await Category.findByIdAndUpdate(category);
        // if(!tagdetails)
        // {
        //     return res.status(401).json({
        //         sucsess:false,
        //         message:"not a valid tag",
        //     });
        // }

        const oldcourse = await Course.findById(courseId);
        

        const update = {
            courseName,
            courseDescription,
            whatYouWillLearn,
            tag:tag,
            Price:Price,
            category:category,
        };
        if (thumbnail) {
            const thumbnailimage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME || "StudyNotion");
            update.thumbnail = thumbnailimage.secure_url;
        }

        const newcourse = await Course.findByIdAndUpdate(courseId, update, {new:true});
        if (!newcourse) {
            return res.status(404).json({ sucsess: false, message: "Course not found" });
        }

        //update in user

    //     const updateduser = await User.findByIdAndUpdate(req.user.id,
    //     {
    //         $push:{courses:newcourse._id}
    //     },
    // {new:true});

    //update in tag schema

    const updatedtag = await Category.findByIdAndUpdate(category,
        {
            $push:{course:newcourse._id}
        },
        {
            new:true,
        }
    );

    const oldtag = await Category.findByIdAndUpdate(oldcourse.category,{
        $pull:{course:oldcourse._id}
    },{new:true});

    return res.status(200).json({
        sucsess:true,
        message:"course updated sucsessfully",
        data:newcourse,
    })


        

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while course updation",
            error,
           
        })

    }
}



//show all courses

exports.showallcourses = async (req,res)=>{
    try {

        const allcourses = await Course.find({}
           
        ).populate("instuctor").exec();

        return res.status(200).json({
            sucsess:true,
            message:"courses fetched sucsessfully",
            data:allcourses,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while fething courses"
        })
    }
}

//show a course details

exports.getCourseDetails = async(req,res)=>{
    try {
        
        const {courseid} = req.body;

        // const coursedetails = await Course.find({_id:courseid}).populate({
        //     path:"instuctor",
        //     populate:{
        //         path:"additionalDetails",
        //     }
        // }).populate("category")
        // .populate({
        //     path:"courseContent",
        //     populate:{
        //         path:"subsection",
        //     }
        // }).exec();

        const course = await Course.findById(courseid).populate({
            path:"courseContent",
            populate:{
                path:"subsection",
            }
        }).populate({
            path:"instuctor"
        }).populate({
            path:"ratingAndReviews"
        }).populate({
            path:"category"
        }).exec();

        console.log(course);

        if(!course)
        {
            return res.status(404).json({
                sucsess:false,
                message:"Course details not found",
            })
        }

    let totalDurationInSeconds = 0
    course.courseContent.forEach((content) => {
      content.subsection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const courseprogress = await CourseProgress.findOne({
        courseid:courseid,
    });

   

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        return res.status(200).json({
            sucsess:true,
            message:"Couese details fetched sucsessfully",
            data:{
                course,
                totalDuration,
                completedvideos:courseprogress?.completedVideos?
                courseprogress.completedVideos:[],
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error with course details fetching",
        })
    }
}

exports.DeleteCourse = async(req,res)=>{
    try {
        
        const {courseid} = req.body;

       const course = await Course.findByIdAndDelete(courseid);
       if (!course) {
            return res.status(404).json({ sucsess: false, message: "Course not found" });
       }
       await Promise.all([
            Category.updateMany({ course: courseid }, { $pull: { course: courseid } }),
            User.updateMany({ courses: courseid }, { $pull: { courses: courseid } }),
            CourseProgress.deleteMany({ courseid }),
       ]);

        
        res.status(200).json({
            sucsess:true,
            message:"Course deleted sucsessfully",
           
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                sucsess:false,
                message:error.message,
            }
        )
    }
}


exports.markleccompleted = async(req,res)=>{
    try {
        
        const {courseid,subsectionid} = req.body;
        
        const complete = await CourseProgress.findOneAndUpdate({ courseid, userid: req.user.id },{
            $addToSet:{completedVideos:subsectionid},
        },{new:true});

        console.log("completed",complete);

        if(!complete)
        {
            return res.status(400).json({
                succsess:false,
            message:"failed to update lec as completed"
            })
        }

        return res.status(200).json({
            succsess:true,
            message:'succsessfull',
            data:complete,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            succsess:false,
            message:error.message
        })
    }
}
