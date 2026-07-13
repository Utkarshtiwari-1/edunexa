import { useState } from "react";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import ConfirmationModal from "../dashborad/ConfirmationModal";
import {deletecourse} from "../../service/operations"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Courserender({coursedata,getallcoursesofinstructor}){

    const [confirmationmodal,setconfirmationmodal] = useState(null);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();

    async function deleteCourse(courseid)
    {
        const response = await deletecourse(courseid,token);
        if(response==="Course deleted sucsessfully")
        {
            setconfirmationmodal(null);
            getallcoursesofinstructor();
        }
        else
        {
            setconfirmationmodal(null);
            toast.error("Course deletion failed");
        }
    }

    function edithandler()
    {
        navigate(`/dashboard/edit-course/${coursedata._id}`);
    }

    return(
        <div>
            <div className="flex justify-between p-3 mt-2 h-[150px]">
            <div className="flex text-sm   text-richblack-50 ">
                <div className="h-[200px] w-[200px] rounded-lg ">
                    <img src={coursedata.thumbnail} className="rounded-md h-[120px] w-[200px] object-cover"></img>
                </div>
                <div className="flex flex-col pl-11 gap-3 ">
                    <p className="text-2xl text-richblack-100 font-semibold">{coursedata.courseName}</p>
                    <p className="text-richblack-200">{coursedata.courseDescription}</p>
                    <p className="text-semibold text-yellow-50">Published</p>
                </div>
            </div>
            <div className="flex gap-x-20 text-white">
                <p>Online</p>
                <p>₹{coursedata.Price}</p>
                <div className="flex gap-3 text-lg">
                    <MdEdit className=" cursor-pointer " onClick={edithandler} ></MdEdit>
                    <MdDeleteOutline className=" cursor-pointer " 
                    onClick={()=>setconfirmationmodal({
                        text1:"Are you sure?",
                        text2:"Your course will we delete from entire system",
                        btn1text:"Delete",
                        btn2text:"Cancel",
                        btn1handler:()=>deleteCourse(coursedata._id),
                        btn2handler:()=>setconfirmationmodal(null)
                    })}></MdDeleteOutline>
                </div>

            </div>
        </div>

                    {
                        confirmationmodal!==null && <ConfirmationModal modaldata={confirmationmodal}></ConfirmationModal>
                    }
        </div>
        
    )
}

export default Courserender;