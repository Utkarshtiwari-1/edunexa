import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileEndpoints } from "../service/apis";
import { apiconnector } from "../service/apiconnector";
import ProgressBar from "@ramonak/react-progress-bar";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Enrolledcourses(){

    const {GET_USER_ENROLLED_COURSES_API} = profileEndpoints;

    const {token} = useSelector((state)=>state.auth);
    const [enrolledcourses,setenrolledcourses] = useState(null);
    const navigate = useNavigate();

    async function Getcourses(){
        try {

            const response = await apiconnector("GET",GET_USER_ENROLLED_COURSES_API,null,{
                "Content-Type": "multipart/form-data",
                 Authorization: `Bearer ${token}`,
            });

            console.log(response);

            setenrolledcourses(response.data.data);
            
        } catch (error) {
            
            toast.error("issue in fetching enrolled courses");
            console.log(error);

        }
    }

    useEffect(()=>{
        Getcourses();
    },[]);
    return(
        <div>
            <div className="text-2xl text-white font-semibold font-inter">Enrolled Courses</div>
            {
                !enrolledcourses?(
                    <div className="w-full h-[500px] flex items-center justify-center">
                    <div className="spinner"></div>
                    </div>):
                !enrolledcourses.length?(<div
                className="text-2xl font-bold text-pink-25 text-center mt-36">You are not enrolled in any course</div>):(
                    <div className="mt-10">
                        <div className="flex justify-between text-white h-[50px] bg-richblack-700 rounded-md items-center
                        pl-5 pr-5">
                            <p>CourseName</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {
                            enrolledcourses.map((course,index)=>{
                                return(
                                    <>
                                        <div onClick={()=>navigate(`/dashboard/course/${course?._id}/section/${course?.courseContent[0]?._id}
                                    /sub-section/${course?.courseContent[0]?.subsection[0]?._id}`)}>
                                            <div className="flex gap-5 items-center cursor-pointer">
                                                <img src={course.thumbnail} className="w-[130px] h-[130px] object-contain rounded-md"></img>
                                                <div className="flex flex-col text-white">
                                                    <p className="font-semibold font-inter">{course.courseName}</p>
                                                    <p className="text-richblack-400">{course.courseDescription}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{course?.totalduration}</p>
                                            </div>
                                            <div>
                                                <p>{course.progresspercentage}</p>
                                                <ProgressBar
                                                completed={course.progresspercentage || 0}
                                                height="6px"
                                                isLabelVisible={false}></ProgressBar>
                                            </div>
                                        </div>
                                    </>
                                    
                                )
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Enrolledcourses;