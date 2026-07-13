const Course = require("../Models/Course");
const Section = require("../Models/Section");

//creation of csection

exports.createSection = async (req,res)=>{
    try {
        
        //fetch data from req
        const {sectionName,courseid} = req.body;

        //validate data
        if(!sectionName)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            })
        }
        //create section

        const sectiondetails = await Section.create({sectionName});

        console.log("sectionsdetaisl",sectiondetails);
        //push section id into the course
        const updatedcourses = await Course.findByIdAndUpdate(courseid,{
            $push:{courseContent:sectiondetails._id}
        },{new:true}).populate({
            path:"courseContent",
            populate : {
                path:"subsection", 
            }
        }).exec();

        console.log("new course",updatedcourses);

        return res.status(200).json({
            sucsess:true,
            message:"section created sucsessfully",
            data:updatedcourses,
        })


    } catch (error) {
        
        console.log("error while section creation",error)
        return res.status(500).json({
            sucsess:false,
            message:"error with section creation",
        })
    }
}

//update section

exports.updateSection = async(req,res)=>{
    try {
        
        //fetch data
        const{sectionName,sectionid,courseid} = req.body;
        //validate
        if(!sectionName || !sectionid)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            })
        }
        //update and return res

        const updatedsection = await Section.findByIdAndUpdate(sectionid,{sectionName:sectionName},
            {new:true},
        );

        const course = await Course.findById(courseid)
        .populate({
            path:"courseContent",
            populate : {
                path:"subsection", 
            }
        }).exec();

        return res.status(200).json({
            sucsess:true,
            message:"section updated sucsessfully",
            data:course,
        })


    } catch (error) {
        return res.status(500).json({
            sucsess:false,
            message:"error with updation on section",
        })
    }
}

//delete section

exports.deleteSection = async(req,res)=>{
    try {
        
        const {sectionid,courseid} = req.body;

        //validation
        if(!sectionid)
        {
            return res.status(401).json({
                sucsess:false,
                message:"section id is required",
            });
        }

        // Remove the reference first so the returned course cannot contain a deleted section.
        const deletedSection = await Section.findByIdAndDelete(sectionid);
        if (!deletedSection) {
            return res.status(404).json({ sucsess: false, message: "Section not found" });
        }
        await Course.findByIdAndUpdate(courseid, { $pull: { courseContent: sectionid } });
        const course = await Course.findById(courseid)
        .populate({
            path:"courseContent",
            populate : {
                path:"subsection", 
            }
        }).exec();

        return res.status(200).json({
            sucses:true,
            message:"section deleted sucsessfully",
            data:course,
        })

    } catch (error) {
        return res.status(500).json({
            sucsess:false,
            message:"error with deletion in section",
        });


    }
}
