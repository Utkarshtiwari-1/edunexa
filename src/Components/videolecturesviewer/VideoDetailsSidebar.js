import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { setCompletedLectures,setCourseSectionData,setEntireCourseData,setTotalNoOfLectures, setcurrentsection, setcurrentsubsection } from "../../slices/viewCourseSlice";
import { useEffect, useState } from "react";
import { getfullcoursedetais } from "../../service/operations";
import { FaChevronDown } from "react-icons/fa";


function VideoDetailsSidebar({setreviewmodal})
{
    const navigate = useNavigate();
    const {courseid,sectionid,subsectionid} = useParams();
    const {courseSectionData,courseEntireData,completedLectures,totalNoOfLectures,
        currentsection,currentsubsection
    } = useSelector((state)=>state.viewCourse);
    const dispatch = useDispatch();
    const [activestatus,setactivestatus] = useState("");
    const location = useLocation();

    useEffect(()=>{
        const entirecoursedata = async()=>{
            const result = await getfullcoursedetais(courseid);
            dispatch(setEntireCourseData(result?.course));
            dispatch(setCourseSectionData(result?.course?.courseContent));
            dispatch(setCompletedLectures(result?.completedvideos));

            let lec = 0;
            result?.course?.courseContent?.forEach((section)=>{
               lec += section.subsection.length

                
            })

            console.log("total lec",lec);
            dispatch(setTotalNoOfLectures(lec));
            console.log("current sec",currentsection);
            console.log("current-subsec",currentsubsection);
            console.log("true ar false",completedLectures);
        }
        entirecoursedata();
    },[location.pathname,courseid,sectionid,subsectionid])

    

    return(
        <div className="flex flex-col min-w-[200px]  border-r-[1px] border-r-richblack-300 
            bg-richblack-800  min-h-[calc(100vh-3rem)] pt-10 ">
            
            <div className="flex justify-center gap-7 pt-2">
                <button className="px-2 py-1 bg-richblack-600 rounded-md text-white"
                onClick={()=>navigate("/dashboard/enrolled-courses")}>Back</button>
                <button className="px-2 py-1 bg-yellow-50 rounded-md text-black"
                onClick={()=>setreviewmodal(true)}>Add Review</button>
            </div>
            <div className="mt-3 mb-2 h-[1px] bg-richblack-400"></div>
            <div>
                {
                    courseSectionData.length && courseSectionData?.map((section)=>(
                        <div>
                            <div className="flex items-center gap-2 bg-richblack-600 text-white border-b
                             border-richblack-200 px-2 py-2 cursor-pointer" key={section._id}
                             onClick={()=>{setactivestatus(section._id)
                             dispatch(setcurrentsection(section))
                             }}>
                                <FaChevronDown></FaChevronDown>
                                <p>{section.sectionName}</p>
                            </div>
                            {
                                activestatus===section._id && (
                                    <div>
                                        {
                                            section.subsection.map((subsection)=>(
                                                <div className="flex items-center cursor-pointer gap-2 px-3 py-2 text-white bg-richblack-700"
                                                key={subsection._id}
                                                onClick={()=>{navigate(`/dashboard/course/${courseid}/section/${section._id}/sub-section/${subsection._id}`)
                                                    dispatch(setcurrentsubsection(subsection))
                                                }}>
                                                    <input type="checkbox" checked={completedLectures.includes(subsection?._id)}
                                                    onChange={()=>{}}></input>
                                                    <p>{subsection.title}</p>
                                                </div>
                                            ))
                                        }
                                    </div>
                                )
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default VideoDetailsSidebar;