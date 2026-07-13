import { useParams } from "react-router-dom";
import Rendersteps from "./Rendersteps";
import { useDispatch, useSelector } from "react-redux";
import { setCourse, setEditCourse } from "../../slices/courseSlice";
import { useEffect } from "react";
import { apiconnector } from "../../service/apiconnector";
import toast from "react-hot-toast";
import { courseEndpoints } from "../../service/apis";

function EditCourse()
{
    const {courseid} = useParams();
    const dispatch = useDispatch();
    const {COURSE_DETAILS_API} = courseEndpoints;

    async function getcoursedetails(){
       const toastId =  toast.loading("Loading...");
        try {
            const response = await apiconnector('POST',COURSE_DETAILS_API,{courseid});
            if(!response.data.sucsess)
            {
                throw new Error(response.data.message);
            }

            let result = response.data.data;
            console.log(result);
            dispatch(setCourse(result));


        } catch (error) {
            console.log(error);
            toast.error("Cannot fetched course");
        }

        toast.dismiss(toastId);
       

    }

    useEffect(()=>{
        dispatch(setEditCourse(true));
        getcoursedetails();
    },[]);

    return(
        <div>
            <Rendersteps></Rendersteps>
        </div>
    )
}

export default EditCourse;