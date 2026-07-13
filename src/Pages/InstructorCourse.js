import { useEffect, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getallcourses } from "../service/operations";
import Courserender from "../Components/dashborad/Courserender";
import toast from "react-hot-toast";

function InstructorCourse(){
    const navigate = useNavigate();
    const [courses,setcourses] = useState([]);
    const {token} = useSelector((state)=>state.auth);

    async function getallcoursesofinstructor()
    {
        const result = await getallcourses(token);
        if(result)
        {
            setcourses(result);
        }
        else
        {
            toast.error("Something went wrong");
        }
    }

    useEffect(()=>{

        getallcoursesofinstructor();
        console.log(courses);
    },[]);

    return(
        <div>
            <div className="flex justify-between ">
                <h1 className="text-3xl font-semibold font-inter text-white">My Courses</h1>
                <button className="flex items-center px-3 gap-1 py-1 bg-yellow-50 text-black rounded-md"
                onClick={()=>navigate("/dashboard/add-course")}>
                    <IoIosAddCircleOutline></IoIosAddCircleOutline>
                    <p>New</p>
                </button>
            </div>
            <div>
                {
                    courses.length===0?(<div className="text-2xl font-semibold
                     text-richblack-50 text-center mt-20">Not created any courses yet</div>):
                     (<div className="mt-10 border border-blue-300 rounded-md">
                        <div className="flex text-sm p-3  text-richblack-50 justify-between border-b border-blue-600">
                            <p>COURSES</p>
                            <div className="flex gap-x-20">
                            <p>DURATION</p>
                            <p>PRICE</p>
                            <p>ACTIONS</p>
                            </div>
                           
                        </div>
                        {
                            courses.map((course)=>{
                                return(
                                    <Courserender coursedata={course}
                                getallcoursesofinstructor={getallcoursesofinstructor}></Courserender>
                                )
                            })
                        }
                     </div>)
                }
            </div>
        </div>
    )
}

export default InstructorCourse;