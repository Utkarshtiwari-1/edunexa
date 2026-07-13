const Category = require("../Models/Category");

exports.createCategory = async(req,res)=>{
    try {

        const {name,description} = req.body;
        console.log("name and description",name,description);
        //validation
        if(!name || !description)
        {
            return res.status(401).json({
                sucsess:false,
                message:"all feilds are required",
            });
        }

        const response = await Category.create({name:name,description:description});

        console.log(response);

        return res.status(200).json({
            sucsess:true,
            message:"Category created sucsessfully",
        });

        
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"error in creating Category",
        });
    }
}

//get all tags

exports.getallcategory = async(req,res)=>{
    try {

        const tags = await Category.find({},{name:true,description:true});

        return res.status(200).json({
            sucsess:true,
            data:tags,
            message:"Category fetched sucsessfully",
        });


        
    } catch (error) {
        
        return res.status(500).json({
            sucsess:false,
            message:"issue with Category fetching"
        });
    }
}

//category page details

exports.categorypageDetails = async(req,res)=>{
    try {
        
        const {categoryid} = req.body;
        console.log(categoryid);


        const selectedcategory  = await Category.findById(categoryid).populate("course").exec();
        if(!selectedcategory)
        {
            return res.status(404).json({
                sucsess:false,
                message:'category specific not found',
            })
        }
        const mycategory = selectedcategory.course;

        //get courses for different courses
        const differentcategories = await Category.find({_id:{$ne:categoryid},})
        .populate("course").exec();

        const diffrentcourses = differentcategories.flatMap((category)=>category.course);
        
        //top 10 selling courses
        //console.log("diffrent categories",differentcategories);
        const courses =  await Category.find()
        .populate({
          path: "course",
          
          populate: {
            path: "instuctor",
        },
        })
        .exec()
      const allCourses = courses.flatMap((category) => category.course)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
        return res.status(200).json({
            sucsess:true,
            message:'category wise courses found',
            data:{
                mycategory,
                diffrentcourses,
                mostSellingCourses,
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucsess:false,
            message:"error while tag wise course fetching",
        })
    }
}


