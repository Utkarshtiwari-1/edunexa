import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import Upload from "../common/Upload";
import { useDispatch, useSelector } from "react-redux";
import { setCourse } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { CreateSubsection } from "../../service/operations";
import { Updatesubsection } from "../../service/operations";

function SubsectionModal(
    {
        modaldata,
        setmodaldata,
        add = false,
        view = false,
        edit = false,
    }
)
{

    const {register,handleSubmit,setValue,formState:{errors},getValues} = useForm();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);
    const {course} = useSelector((state)=>state.course);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(view || edit)
        {
            setValue("LectureTitle",modaldata.title);
            setValue("LectureDesc",modaldata.description);
            setValue("LectureVideo",modaldata.videoUrl);
        }
    },[]);

    const isformupdated = ()=>{
        const currentvalues = getValues();

        if(currentvalues.LectureTitle!==modaldata.title || currentvalues.LectureDesc!==modaldata.description
            || currentvalues.LectureVideo!==modaldata.videourl
        )
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    async function submithandler(data)
    {
        if(edit!==false)
        {
            if(isformupdated())
            {
                handleeditsubsection();
                return;
            }
            else
            {
                toast.error("No updation in lecture");
                setmodaldata(null);
            }
        }
        const formData  = new FormData();
        formData.append("title",data.LectureTitle);
        formData.append("description",data.LectureDesc);
        formData.append("videofile",data.LectureVideo);
        formData.append("sectionid",modaldata);
        formData.append("courseid",course._id);
        setLoading(true);
        const result = await CreateSubsection(formData,token);
        if(result)
        {
            dispatch(setCourse(result));
            setmodaldata(null);
        }
        else
        {
            toast.error("Failed to create Lecture");
            setmodaldata(null);
        }

    }

    async function handleeditsubsection()
    {
        const currentvalues = getValues();
        const formData = new FormData();
        formData.append("sectionid",modaldata.sectionid);
        formData.append("courseid",course._id);
        formData.append("subsectionid",modaldata._id);
        if(currentvalues.LectureTitle!==modaldata.title)
        {
            formData.append("title",currentvalues.LectureTitle);
        }
        if(currentvalues.LectureDesc!==modaldata.description)
        {
            formData.append("description",currentvalues.LectureDesc);
        }
        if(currentvalues.LectureVideo!==modaldata.videourl)
        {
            formData.append("videoFile",currentvalues.LectureVideo);
        }

        setLoading(true);
        const result = await Updatesubsection(formData,token);
        if(!result)
        {
            toast.error("Failed to update Lecture");
            setmodaldata(null);
        }
        else
        {
            dispatch(setCourse(result));
            setmodaldata(null);
        }
    }




    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="max-w-[500px] bg-richblack-800 w-11/12 rounded-md ">
                <div className="flex justify-between bg-richblack-500 p-3 h-[50px] border-b border-richblack-300 ">
                    <p>{view && "Viewing"} {add && "Adding"} {edit && "Editting"}{" "}Lecture</p>
                    <button onClick={()=>setmodaldata(null)}>
                        <AiOutlineClose></AiOutlineClose>
                    </button>
                </div>
                <div className="p-5">
                <form onSubmit={handleSubmit(submithandler)}>
                    <Upload
                    name="LectureVideo"
                    label="Lecture Video"
                    register={register}
                    setValue={setValue}
                    errors={errors}
                    video={true}
                    viewData={view?modaldata.videourl:null}
                    editData={edit?modaldata.videourl:null}
                    className="p-5"></Upload>

                    <div className="pt-4">
                        <label className="text-sm text-richblack-100 ">Lecture Title<sup className="text-pink-600 text-md">*</sup></label>
                        <input name="LectureTitle" {...register("LectureTitle",{required:true})}
                        placeholder="Enter Lecture Title"
                        className="w-full bg-richblack-700 text-white p-3 rounded-md"></input>
                    </div>
                    <div className="pt-4">
                        <label className="text-sm text-richblack-100 ">Lecture Description<sup className="text-pink-600 text-md">*</sup></label>
                        <textarea name="LectureDesc" {...register("LectureDesc",{required:true})}
                        placeholder="Enter Lecture Description..."
                        className="w-full bg-richblack-700 text-white p-3 rounded-md min-h-[130px]"></textarea>
                    </div>
                    {
                        !view && (
                            <div>
                                <button className="px-2 py-1 bg-yellow-50 text-black mt-2 rounded-md "
                                type="submit">
                                    {
                                        edit!==false?"Save Changes":"Save"
                                    }
                                </button>
                            </div>
                        )
                    }
                </form>
                </div>
                
            </div>
        </div>
    )


}

export default SubsectionModal;