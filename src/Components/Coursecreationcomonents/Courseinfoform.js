import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {apiconnector} from "../../service/apiconnector"
import { courseEndpoints } from "../../service/apis";
import { FaIndianRupeeSign } from "react-icons/fa6";
import Chiptagcomponent from "./Chiptagcomponent";
import Thumbnailcomponent from "./Thumbnailcomponent";
import Requirementfeild from "./Requirementfeild";
import { useDispatch, useSelector } from "react-redux";
import { setStep,setCourse } from "../../slices/courseSlice";
import { addCourseDetails } from "../../service/operations";
import { editCourseDetails } from "../../service/operations";
import Upload from "../common/Upload";

function Courseinfoform(){

    const {COURSE_CATEGORIES_API}  = courseEndpoints;
    const {course,editCourse} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();
    const [categories,setcategories] = useState([]);
    const [loading,setLoading] = useState(false);
    
    async function Getcategories(){
        const toastid = toast.loading("Loading...");
        try {
            
            const response = await apiconnector("GET",COURSE_CATEGORIES_API);

            console.log("response category",response.data.data);

            setcategories(response.data.data);

        } catch (error) {
            console.log("fetching in categories",error);

        }
        toast.dismiss(toastid);
    }

    useEffect(()=>{

        Getcategories();

        if(editCourse===true)
        {
          console.log(course,"Course in useeffect");
            setValue("Coursetitle",course.courseName);
            setValue("Courseshortdesc",course.courseDescription);
            setValue("Courseprice",course.Price);
            setValue("Coursecategory",course.category);
            setValue("Coursetags",course.tag);
            setValue("Coursebenefits",course.whatYouWillLearn);
            setValue("Courserequirements",course.instructions);
            setValue("thumbnailimage",course.thumbnail);
            //setValue("Coursename",course.courseName);

        }

    },[])

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
          currentValues.Coursetitle !== course.courseName ||
          currentValues.Courseshortdesc !== course.courseDescription ||
          currentValues.Courseprice !== course.Price ||
          currentValues.Coursetags.toString() !== course.tag.toString() ||
          currentValues.Coursebenefits !== course.whatYouWillLearn ||
          currentValues.Coursecategory._id !== course.category ||
          currentValues.Courserequirements.toString() !==
            course.instructions.toString() ||
          currentValues.thumbnailimage !== course.thumbnail
        ) {
          return true
        }
        return false
      }

     async function submithandler(data)
      {
        console.log("submit hua");
            if(editCourse)
            {
                if (isFormUpdated()) {
                    const currentValues = getValues()
                    console.log("Current",currentValues);
                    const formData = new FormData()
                    // console.log(data)
                    formData.append("courseId", course._id)
                    if (currentValues.Coursetitle !== course.courseName) {
                      formData.append("courseName", data.Coursetitle)
                    }
                    else
                    {
                      formData.append("courseName", course.courseName)
                    }
                    if (currentValues.Courseshortdesc !== course.courseDescription) {
                      formData.append("courseDescription", data.Courseshortdesc)
                    }
                    else
                    {
                      formData.append("courseDescription", course.courseDescription)
                    }
                    if (currentValues.Courseprice !== course.Price) {
                      formData.append("Price", data.Courseprice)
                    }
                    else
                    {
                      formData.append("Price", course.Price)
                    }
                    if (currentValues.Coursetags.toString() !== course.tag.toString()) {
                      formData.append("tag", JSON.stringify(data.Coursetags))
                    }
                    else
                    {
                      formData.append("tag", course.tag)
                    }
                    if (currentValues.Coursebenefits !== course.whatYouWillLearn) {
                      formData.append("whatYouWillLearn", data.Coursebenefits)
                    }
                    else
                    {
                      formData.append("whatYouWillLearn", course.whatYouWillLearn)
                    }
                    if (currentValues.Coursecategory !== course.category) {
                      formData.append("category", data.Coursecategory)
                    }
                    else
                    {
                      formData.append("category",  course.category)
                    }
                   
                    if (currentValues.thumbnailimage !== course.thumbnail) {
                      formData.append("thumbnailimage", data.thumbnailimage)
                    }
                     console.log("Edit Form data: ", formData)
                    setLoading(true)
                    const result = await editCourseDetails(formData, token)
                    setLoading(false)
                    if (result) {
                      dispatch(setStep(2))
                      dispatch(setCourse(result))
                    }
                  } else {
                    toast.error("No changes made to the form")
                  }

                  return;
            }

            const formData = new FormData();
            formData.append("courseName", data.Coursetitle)
            formData.append("courseDescription", data.Courseshortdesc)
            formData.append("Price", data.Courseprice)
            formData.append("tag", JSON.stringify(data.Coursetags))
            formData.append("whatYouWillLearn", data.Coursebenefits)
            formData.append("category", data.Coursecategory)
            formData.append("thumbnailimage",data.thumbnailimage);
            // formData.append("status", COURSE_STATUS.DRAFT)
            formData.append("instructions", JSON.stringify(data.Courserequirements))
            console.log("form data",formData);
            setLoading(true)
            const result = await addCourseDetails(formData, token);
            if (result) {
              dispatch(setStep(2));
              dispatch(setCourse(result));
            }
            setLoading(false)
      }


    return(
        <div className="w-full">
            
                <form  onSubmit={handleSubmit(submithandler)}
                    className="w-[75%] p-5 mt-8 bg-richblack-700 rounded-md  flex flex-col gap-4 z-0 ">

                    <div>
                        <label htmlFor="Coursetitle" className="text-richblack-100 text-sm pb-2">Course Title <sup className="text-pink-500">*</sup></label>
                        <input name="Coursetitle" placeholder="Enter course title"
                        {...register("Coursetitle",{required:true})} 
                        className="w-full text-white pl-4 bg-richblack-800 rounded-md p-2"></input>
                        

                    </div>
                    <div >
                        <label htmlFor="Courseshortdesc" className="text-richblack-100 text-sm">Course Short desc <sup className="text-pink-500">*</sup></label>
                        <textarea name="Courseshortdesc" placeholder="Enter course short desc"
                        {...register("Courseshortdesc",{required:true})}
                     className="w-full text-white pl-4 bg-richblack-800 min-h-[130px] rounded-md p-2"></textarea>
                       

                    </div>
                    <div className="relative ">
                        <label htmlFor="Courseprice" className="text-richblack-100 text-sm pb-2">Course Price <sup className="text-pink-500">*</sup></label>
                        <input name="Courseprice" placeholder="Enter Course price"
                        {...register("Courseprice",{required:true})} 
                        className="w-full text-white pl-6 bg-richblack-800 rounded-md p-2"></input>
                        <FaIndianRupeeSign className="absolute top-[55%] left-1 text-richblack-400"></FaIndianRupeeSign>

                    </div>
                    <div >
                        <label htmlFor="Coursecategory" className="text-richblack-100 text-sm pb-2">Categories<sup className="text-pink-500">*</sup></label>
                        <select name="Coursecategory" 
                        {...register("Coursecategory",{required:true})} 
                        className="w-full text-white pl-4 bg-richblack-800 rounded-md p-2">
                            <option  value={""}>Choose category</option>
                            {
                                categories.map((category,index)=>{
                                    return(
                                        <option value={category._id} key={index}>{category.name}</option>
                                    )
                                })
                            }
                        </select>
                       

                    </div>
                    <div>
                        <Chiptagcomponent label="Tags" name="Coursetags" register={register}
                        setValue={setValue}></Chiptagcomponent>
                    </div>
                    <div>
                        <Upload
                        name="thumbnailimage"
                        label="Upload Thumbnail image"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        editData={editCourse ? course?.thumbnail : null}
                       ></Upload>
                    </div>
                    <div >
                        <label htmlFor="Coursebenefits" className="text-richblack-100 text-sm">Benefits of the Course <sup className="text-pink-500">*</sup></label>
                        <textarea name="Coursebenefits" placeholder="Enter benefits"
                        {...register("Coursebenefits",{required:true})}
                     className="w-full text-white pl-4 bg-richblack-800 min-h-[130px] rounded-md p-2"></textarea>
                       

                    </div>
                    <div>
                        <Requirementfeild
                        name="Courserequirements"
                        label="Requirements/Instruction"
                        register={register}
                        setValue={setValue}
                        ></Requirementfeild>
                    </div>


                    
                   
                    <div className="flex  gap-x-2">
                    {editCourse && (
                    <button
                      onClick={() => dispatch(setStep(2))}
                     disabled={loading}
                     className={` rounded-md bg-richblack-300 px-2 py-1  text-richblack-900`}
                     >
                     Continue Wihout Saving
                     </button>
                    )}
                    <button className="px-2 py-1 bg-yellow-50 text-black mt-5 rounded-md 
                    " type="submit">
                        {
                            editCourse ?"Save changes" :"Next"
                        }
                    </button>
                    </div>

                    
                    
                    
                </form>
            
           
       
        
        </div>
        
    )
}

export default Courseinfoform;