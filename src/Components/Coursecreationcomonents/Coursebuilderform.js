import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { setCourse,setEditCourse,setStep } from "../../slices/courseSlice";
import { Createsection } from "../../service/operations";
import Nestedview from "./Nestedview";
import { Updatesection } from "../../service/operations";

function Coursebuilderform(){

    const [editsecname,seteditsecname] = useState(null);
    const {course} = useSelector((state)=>state.course);
    const {register,handleSubmit,setValue,getValues,formState:{errors}} = useForm();
    const [loading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);

    function cancelEdit(){
        seteditsecname(null);
    }

    function goback(){
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    function gonext()
    {
        if(course.courseContent.length===0)
        {
            toast.error("Plz add atleast one section");
            return;
        }
        dispatch(setStep(3));
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if(editsecname === sectionId ){
          cancelEdit();
          return;
        }
        
        seteditsecname(sectionId);
        setValue("sectionName", sectionName);
      }


    async function submithandler(data){

        if(editsecname!==null)
        {
            const formData = new FormData();
            formData.append("sectionName",data.sectionName);
            formData.append("sectionid",editsecname);
            formData.append("courseid",course._id);
            setLoading(true);
            const result = await Updatesection(formData,token);
            console.log("result update",result);
            setLoading(false);
            if(result)
                {
                    dispatch(setCourse(result));
                    setValue("sectionName","");
                    seteditsecname(null);
                }
            return;
        }
        
        const formData = new FormData();
        formData.append("sectionName",data.sectionName);
        formData.append("courseid",course._id);
        setLoading(true);
        const result = await Createsection(formData,token);
        console.log(result);
        setLoading(false);
        if(result)
        {
            dispatch(setCourse(result));
            setValue("sectionName","");
            seteditsecname(null);
        }
        else
        {
            toast.error("failed to create section");
        }
        
    }

    return(
        <div className="w-[75%] bg-richblack-700 border border-richblack-600 mt-10 p-5 rounded-md">
            <p className="text-xl font-semibold font-inter text-white">Course Builder</p>
            <form className="flex flex-col " onSubmit={handleSubmit(submithandler)}>
                <div className="flex flex-col mt-5">
                    <label htmlFor="sectionName" className="text-richblack-100 text-sm pb-2">Section Name
                    <sup className="text-pink-700">*</sup></label>
                    <input name="sectionName" placeholder="Enter course section name"
                    className="w-full text-white pl-4 bg-richblack-800 rounded-md p-2"
                    {...register("sectionName",{required:true})}></input>
                </div>
                <div className="mt-4 rounded-md flex gap-x-3">
                <button  type="submit" className="px-2 py-1 bg-yellow-50 flex items-center rounded-md  ">
                        {
                            editsecname!==null ?(<p>Edit section name</p>):(
                                <div className="flex items-center gap-x-1">
                                <IoIosAddCircleOutline></IoIosAddCircleOutline>
                                <p>Create Section</p>
                                </div>
                            )
                        }
                        
                </button>
                {
                    editsecname!==null && <button type="button"  className="text-richblack-600"
                    onClick={cancelEdit}>cancel Edit</button>
                }
                </div>
                
            </form>

            {
                course.courseContent.length>0 && 
                (<div>
                    <Nestedview handleChangeEditSectionName={handleChangeEditSectionName}></Nestedview>
                </div>)
            }

            <div className="flex justify-center gap-2 mt-10">
                <button className="px-2 py-1 bg-richblack-600 text-richblack-50 rounded-md " onClick={goback}>Back</button>
                <button className="px-2 py-1 bg-yellow-50  text-white rounded-md " onClick={gonext}>Next</button>
            </div>
        </div>
    )
}

export default Coursebuilderform;