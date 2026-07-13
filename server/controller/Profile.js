const Course = require("../Models/Course");
const Profile = require("../Models/Profile");
const User = require("../Models/User");
const {uploadImageToCloudinary} = require("../Utils/imageuploader");

//upade profile

exports.upadteProfile = async(req,res)=>{
    try {

        //data fetch
        const {gender,DateofBirth = " ",about = " ",phoneNumber,Profession} = req.body;
        const usrid = req.user.id;
        //user id se user fetch karke profile id nikalenge then update karenge
        

        const user = await User.findById(usrid);
        console.log(user);
        const profileid = user.additionalDetails;
        const profiledetails = await Profile.findById(profileid);
        //upadate
        profiledetails.gender = gender;
        profiledetails.DateofBirth = DateofBirth;
        profiledetails.about = about;
        profiledetails.phoneNumber = phoneNumber;
        profiledetails.Profession = Profession;

        await profiledetails.save();

        const updateduser = await User.findById(usrid).populate("additionalDetails");

        return res.status(200).json({
            sucsess:true,
            message:"user profile updated sucsessfully",
            data:updateduser,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error with profie updation"
        })
    }
}

//delete account
//to schedule this delete after five days we can use node-schedule,settimeout ,agenda etc



exports.deleteAccount = async(req,res)=>{
    try {
        
        const id = req.user.id;

        const user = await User.findById(id);

        if(!user)
        {
            return res.status(404).json({
                sucsess:false,
                message:"user not found",
            })
        }

        await Profile.findByIdAndDelete({_id:user.additionalDetails});

        const allcourses  = user.courses;

         //unroll the particular user
        await Promise.all(allcourses.map((course) => Course.findByIdAndUpdate(course, {
            $pull:{studentEnrolled:id}
        })));

        console.log(allcourses);

        await User.findByIdAndDelete(id);

       return res.status(200).json({
        sucsess:true,
        message:"user deletad sucsessfully",
       });

    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error while deleting user",
        })
    }
}

exports.getAllUserDetails = async (req, res) => {
	try {
		const id = req.user.id;
		const userDetails = await User.findById(id)
			.populate("additionalDetails")
			.exec();
		console.log(userDetails);
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files?.displayPicture
      if (!displayPicture) {
        return res.status(400).json({ success: false, message: "Display picture is required" })
      }
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate(
          {
            path:"courses",
            populate:{
              path:"courseContent",
              populate:{
                path:"subsection",
              }
            }
          }
        )
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};

exports.instuctorDashboard = async(req,res)=>{
  try {
    
    const coursedetails = await Course.find({instuctor:req.user.id});

    const coursedata = coursedetails.map((course)=>{

      const totalstudentsenrolled = course.studentEnrolled.length;
      const totalamount = totalstudentsenrolled*course.Price;

      const coursedetailswithstatus = {
        _id:course._id,
        courseName:course.courseName,
        courseDescription:course.courseDescription,
        totalstudentsenrolled,
        totalamount,
      }

      return coursedetailswithstatus;
    })


    return res.status(200).json({
      succsess:true,
      message:"Course details fetched succsessfully",
      courses:coursedata,
    })

  } catch (error) {
    
    console.log(error);
    return res.status(400).json({
      succsess:false,
      message:"error in course stats fetching",
    });

  }
}
