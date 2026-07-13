import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ReactStars from "react-stars";
import { addreview } from "../../service/operations";


function ReviewModal({setreviewmodal})
{

    const {register,handleSubmit,setValue,getValues} = useForm();
    const {user} = useSelector((state)=>state.profile);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[]);

    function ratingchange(newrating){
        setValue("courseRating",newrating);
        const value = getValues();
        console.log("value",value);
    }

    async function onsubmit(data){
        const formData = new FormData();
        formData.append("rating",data.courseRating);
        formData.append("review",data.courseExperience);
        formData.append("courseid",courseEntireData?._id);
        //console.log("formdata",data.courseRating,data.courseExperience);
        await addreview(formData,token);
        setreviewmodal(false);

    }


    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-8/12 bg-richblack-700 rounded-md">
                <div className="flex justify-between p-4 text-white ">
                    <div>Add review</div>
                    <div className="text-yellow-50 cursor-pointer"
                     onClick={()=>setreviewmodal(false)}>Close</div>

                </div>
                <div className="h-[2px] bg-richblack-300"></div>
                <div className="pt-7 pb-5">
                    <div className="flex justify-center gap-4">
                        <img src={user?.image} className="w-[60px] h-[60px] object-contain
                         aspect-square rounded-full"></img>
                        <div className="flex flex-col gap-1 text-white">
                           <p className="text-semibold text-xl">{user?.FirstName}</p>
                           <p>Posting publically</p>
                        </div>
                    </div>
                    <form className="flex flex-col items-center justify-center pt-5"
                    onSubmit={handleSubmit(onsubmit)}>
                        <ReactStars 
                        count={5}
                        onChange={ratingchange}
                        size={40}></ReactStars>
                        <div className="flex flex-col pt-4 ">
                            <label htmlFor="courseExperience" 
                            className="text-white pb-2">Add your Experience</label>
                            <textarea {...register("courseExperience")}
                            required={true} name="courseExperience"
                            placeholder="Add review"
                            className="min-w-[500px] min-h-[100px] bg-richblack-100 text-black"></textarea>
                        </div>
                        <div className="pt-5">
                            <button className="px-2 py-1 bg-yellow-50 text-black rounded-md" type="submit">Save</button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    )
}

export default ReviewModal;