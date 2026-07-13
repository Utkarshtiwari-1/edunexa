import { useNavigate } from "react-router-dom";
import { setStep } from "../../slices/courseSlice";
import toast from "react-hot-toast";
import { MdPublish } from "react-icons/md";
import { useDispatch } from "react-redux";


function Publishform(){
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function publishhandler()
    {
        toast.success("Course Published sucsessfully");
        dispatch(setStep(1));
        navigate("/dashboard/my-courses");
    }

    return(
        <div className="flex justify-between mt-10 bg-richblack-600 p-6 rounded-md w-[60%] ">
            <button className="px-2 py-1 bg-richblack-400 text-white roudned-md"
            onClick={()=>dispatch(setStep(2))}>Go back</button>
            <button className="px-2 py-1 flex items-center gap-1 bg-yellow-50 text-black roudned-md"
            onClick={publishhandler}>
                <p>Publish Your Course</p>
                <MdPublish></MdPublish>
            </button>
        </div>
    )
}

export default Publishform;