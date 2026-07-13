
const Section = require("../Models/Section");
const Subsection = require("../Models/SubSection");
const {uploadImageToCloudinary} = require("../Utils/imageuploader");
const Course  = require("../Models/Course");

//creation of subsection
exports.createSubsection = async(req,res)=>{
    try {
        
        //fetch data and files
        const {sectionid,title,description,courseid} = req.body;
        console.log({sectionid,title,description,courseid});
        const video = req.files?.videofile;
        //validation

        if(!title  || !description || !video)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all fields are required",
            })
        }
        //upload to cloudinary
        const uploadedvideo = await uploadImageToCloudinary(video,process.env.FOLDER_NAME || "StudyNotion");
        console.log(uploadedvideo);
        //data entry in db
        const data = await Subsection.create({title,
            timeDuration:`${uploadedvideo.duration}`
            ,description,videourl:uploadedvideo.secure_url});

        //entry in section
        const updatedsection = await Section.findByIdAndUpdate(sectionid,
            {
                $push:{subsection:data._id}
            },
            {new:true}
        ).populate("subsection").exec(); 
        //return res

        const course = await Course.findById(courseid).populate({
            path:"courseContent",
            populate:{
                path:"subsection",
            }
        }).exec();
        return res.status(200).json({
            sucsess:true,
            message:"subsection created sucsessfully",
            data:course
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error with subsection creation",
        })
    }
}

//update subsection
exports.updatesubsection = async (req,res)=>{
    try {
        
        //fetch data
        const {title,description,subsectionid,courseid} = req.body;
        console.log({title,description,subsectionid,courseid});

        const subsection = await Subsection.findById(subsectionid);

        if (!subsection) {
            return res.status(404).json({
              success: false,
              message: "SubSection not found",
            })
          }
        
          if (title !== undefined) {
            subsection.title = title
          }
      
          if (description !== undefined) {
            subsection.description = description
          }
          if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
              video,
              process.env.FOLDER_NAME
            )
            subsection.videourl = uploadDetails.secure_url;
            subsection.timeDuration = `${uploadDetails.duration}`
          }
      

          await subsection.save();

          const course = await Course.findById(courseid).populate({
            path:"courseContent",
            populate:{
                path:"subsection",
            }
        }).exec();

        return res.status(200).json({
            sucsess:true,
            message:"subsection updated sucsessfully",
            data:course,
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error with updating subsection",
        })
    }
}

//deletion of subsection

exports.deletesubsection = async(req,res)=>{
    try {
        
        const {subsectionid,sectionid,courseid} = req.body;

        //vlaidate
        if(!subsectionid)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all fields are required",
            })
        }

        await Section.findByIdAndUpdate(sectionid, { $pull:{subsection:subsectionid} });

        await Subsection.findByIdAndDelete(subsectionid);

        const course = await Course.findById(courseid).populate({
            path:"courseContent",
            populate:{
                path:"subsection",
            }
        }).exec();

        return res.status(200).json({
            sucsess:true,
            message:"subsection deleted sucsessfully",
            data:course
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while deleting subsection",
        })
    }
}
