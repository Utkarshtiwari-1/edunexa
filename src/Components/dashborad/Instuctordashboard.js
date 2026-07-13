import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { getallcourses } from "../../service/operations";
import { getinstructordata } from "../../service/operations";
import { Link } from "react-router-dom";
import Instructorchart from "./Instructorchart";

function Instuctordashboard(){

    const [courses,setcourses] = useState([]);
    const [instructordata,setinstructordata] = useState(null);
    const [loading,setloading] = useState(false);
    const {token}  = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);

    useEffect(()=>{

        const getcoursedatawithstats = async()=>{
            setloading(true);
            const instructorapidata = await getinstructordata(token);
            const result = await getallcourses(token);
            console.log(instructorapidata);
            if(instructorapidata.length)
            {
                setinstructordata(instructorapidata);
            }
            if(result)
            {
                setcourses(result);
            }

            setloading(false);
        }
        getcoursedatawithstats();


    },[])

    const totalincome = instructordata?.reduce((acc,curr)=>acc+curr.totalamount,0);
    const totalstudents = instructordata?.reduce((acc,curr)=>acc+curr.totalstudentsenrolled,0);

    return(
        <div>
            <div>
                <h1 className="text-2xl text-white font-inter font-semibold">Hi {user.FirstName}</h1>
                <p className="text-richblack-300 ">Let's start something new</p>
            </div>
            {
                loading?(<div className="spinner"></div>):(
                    courses.length>0?(
                        <div>
                            <div className="flex gap-2 mt-10 justify-between">
                                <div className="w-[70%]  p-7 bg-richblack-800 rounded-md flex ">
                                    <Instructorchart courses={instructordata}></Instructorchart>
                                </div>
                                <div className="text-white bg-richblack-800 rounded-md p-8 min-w-[30%] ">
                                    <p className="text-yellow-5 font-semibold text-2xl ">Statistics</p>
                                    <div className="mt-5">
                                        <p className="text-xl ">Total Courses</p>
                                        <p className="text-2xl font-semibold">{courses.length}</p>
                                    </div>
                                    <div className="mt-5">
                                        <p className="text-xl ">Total students</p>
                                        <p className="text-2xl font-semibold">{totalstudents}</p>
                                    </div>
                                    <div className="mt-5">
                                        <p className="text-xl ">Total income</p>
                                        <p className="text-2xl font-semibold">{totalincome}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="text-white p-5 bg-richblack-800 rounded-md mt-3">
                                <div className="flex justify-between mb-2" >
                                    <p className="font-semibold">Your courses</p>
                                    <Link to="/dashboard/my-courses">
                                        <p className="text-yellow-50">View all</p>
                                    </Link>
                                </div>
                                <div className="flex justify-between">
                                    {
                                        courses.slice(0,3).map((course)=>(
                                            <div>
                                                <img src={course.thumbnail} 
                                                className="h-[180px] w-[300px] object-cover rounded-md"></img>
                                                <div>
                                                    <p className="font-semibold pt-1">{course.courseName}</p>

                                                </div>
                                                <div className="flex gap-3 text-richblack-300">
                                                    <p >{course.studentEnrolled.length} students</p>
                                                    <p>|</p>
                                                    <p>Rs. {course.Price}</p>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ):(<div className="flex flex-col justify-center items-center w-full h-[500px]">
                        <p className="text-xl font-semibold text-richblack-200">You have'nt created any course yet</p>
                        <Link to="/dashboard/add-course" className="text-yellow-50 cursor-pointer text-center">Create course</Link>
                    </div>)
                )
            }
        </div>
    )
}

export default Instuctordashboard