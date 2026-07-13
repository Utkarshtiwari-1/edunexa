import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { buycourse } from "../service/operations";
import { useEffect, useState } from "react";
import {getfullcoursedetais} from "../service/operations";
import GetAvgRating from "../Utils/avgRating"
import RatingStars from "../Components/common/RatingStars";
import { formattedDate } from "../Utils/dateFormatter";
import { MdLanguage } from "react-icons/md";
import copy from "copy-to-clipboard"
import { FaShareFromSquare } from "react-icons/fa6";
import { FaHandPointDown } from "react-icons/fa";
import Footer from "../Components/common/Footer"
import {addtocart,settotalItems} from "../slices/cartslice" 



function CourseDetails()
{
    const {cartitems} = useSelector((state)=>state.cart);
    
    const {token} = useSelector((state)=>state.auth);
    const {courseid} = useParams();
    const {user} = useSelector((state)=>state.profile);
    const [coursedetails,setcoursedetails] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading,setloading] = useState(false);
    const [rating,setrating] = useState(4.5);
    const location = useLocation();
    const [sections,setsections] = useState(0);
    const [subsec,setsubsec] = useState(0);
    const [opensection,setopensection] = useState([]);
    const [sectionlec,setsectionlec] = useState([]);
    

    async function getcoursedetails(courseid)
    {
        setloading(true);
        const result = await getfullcoursedetais(courseid);
        console.log(result,"result");
        if(result!==null)
        {
            setcoursedetails(result);
            const avgRating = GetAvgRating(result?.course?.ratingAndReviews);
            setrating(avgRating);
        }
        setloading(false);
    }

    useEffect(()=>{
        getcoursedetails(courseid);
        console.log(coursedetails,"coursedetaisl");
        const sec = coursedetails?.course?.courseContent.length;
        setsections(sec);
        let subSection = 0;
        coursedetails?.course?.courseContent.forEach((section)=>{
            let seclec  = 0;
            section?.subsection?.forEach((subsect)=>{
                subSection += 1;
                seclec += 1;
            })
            setsectionlec([...sectionlec,seclec]);
        })
        setsubsec(subSection);
        
        
    },[]);

    function handlebuycourse()
    {
        if(token)
        {
            buycourse(token,[courseid],user,navigate,dispatch);
        }
        else{
            toast.error("Login first");
        }
    }

    function sharehandler()
    {
        copy(window.location.href);
        toast.success("Link copied successfully");
    }

    function handlesectionopen(sectionid)
    {
        if(opensection.includes(sectionid))
        {
            let newarray = opensection.filter((section)=>section!==sectionid);
            setopensection(newarray);
        }
        else
        {
            setopensection([...opensection,sectionid]);
        }
    }

    function addtoCart()
    {
        dispatch(addtocart(coursedetails?.course));
        dispatch(settotalItems());
        console.log("cartitem",cartitems);
        toast.success("Added to cart");
    }


    return(<div>
            <div className="bg-richblack-800 ">
                <div className="w-10/12 mx-auto pt-10 relative">
                    <div className="bg-richblack-800 relative w-[60%] ">
                    <p className="text-sm text-richblack-300"> Home / Learning /
                    <span className="text-yellow-50">{" "}{coursedetails?.course?.category?.name}</span></p>
                    <div className="text-3xl text-white font-semibold pt-5">{coursedetails?.course?.courseName}</div>
                    <div className="text-richblack-300 pt-1">{coursedetails?.course?.courseDescription}</div>
                    <div className="flex items-center gap-3 pt-3">
                        <p className="text-yellow-100">{rating}</p>
                        <RatingStars Review_Count={rating}></RatingStars>
                        <p className="text-white">{`(${coursedetails?.course?.ratingAndReviews.length} Ratings)`}</p>
                        <p className="text-white">{`${coursedetails?.course?.studentEnrolled.length} Students`}</p>
                    </div>
                    <div className="text-white pt-2">
                        {`Created by ${coursedetails?.course?.instuctor?.FirstName} ${coursedetails?.course?.instuctor?.LastName}`}
                    </div>
                    <div className="flex items-center gap-3 pb-10">
                        <div className="text-white pt-1">Created at {formattedDate(coursedetails?.course?.createdAt)}</div>
                        <div className="text-white flex items-center gap-1">
                            <MdLanguage></MdLanguage>
                            <p>Hinglish</p>
                        </div>
                    </div>
                    </div>
                    <div className="lg:absolute bg-richblack-700 pb-6 rounded-md lg:top-[80px] lg:right-20">
                        <div>
                            <img src={coursedetails?.course?.thumbnail} 
                            className="lg:w-[350px] lg:h-[200px] rounded-md object-cover "></img>
                        </div>
                        <div className="pl-4 pr-4">
                        <div className="text-2xl font-semibold text-white pt-5">
                        Rs. {coursedetails?.course?.Price}</div>
                        {
                            !coursedetails?.course?.studentEnrolled.includes(user._id) && 
                            (<button className="bg-yellow-50 text-black px-2 py-2 w-full text-center
                            rounded-md mt-3" 
                            onClick={addtoCart}>Add to cart</button>)
                        }
                        <button className="bg-richblack-800 text-white px-2 py-2 w-full text-center
                            rounded-md mt-3"
                            onClick={handlebuycourse}>{coursedetails?.course?.studentEnrolled.includes(user._id)?"Complete course"
                            :"Buy Now"}</button>
                        
                        <p className="text-richblack-200 pt-3 text-sm text-center">30-Day Money-Back Guarantee</p>
                        <div className="flex justify-center pt-4">
                            <button className="text-yellow-50 flex items-center gap-2"
                            onClick={sharehandler}>
                                <FaShareFromSquare></FaShareFromSquare>
                                <p>Share</p>
                            </button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-10/12 mx-auto">
            <div className="w-[50%]">
                <div className=" text-white p-3 border border-blue-600 mt-8">
                        <div className="text-2xl font-semibold font-inter">What you will learn</div>
                        <div>{coursedetails?.course?.whatYouWillLearn}</div>
                    </div>
                    <div className="text-2xl text-white font-semibold pt-10">
                        Course Content
                    </div>
                    <div className="pt-2 flex justify-between">
                        <div className="flex text-white gap-2">
                            <span>{sections} sections</span>
                            <span>{subsec} Lectures</span>
                            <span>{coursedetails?.totalDuration} total length</span>
                        </div>
                        <div className="text-yellow-100 cursor-pointer">
                            collapse all sections
                        </div>
                    </div>

                    <div className="pt-4">
                        {
                            coursedetails?.course?.courseContent?.map((section,index)=>(
                                <div className="cursor-pointer ">
                                    <div className="flex flex-row  justify-between bg-richblack-600 pt-3 pb-3 p-2"
                                    onClick={()=>handlesectionopen(section._id)}>
                                      <p className="text-white flex items-center gap-2">
                                      <FaHandPointDown></FaHandPointDown>
                                      <p>{section?.sectionName}</p></p>
                                      <p className="text-yellow-50">{sectionlec[index]} Lectures</p>
                                    </div>
                                    {
                                        opensection.includes(section._id) && 
                                        (
                                            <div className="p-2 border border-blue-800 transition-all duration-200 ">
                                                {
                                                    section?.subsection?.map((subSection)=>(
                                                        <div className="flex justify-between text-white">
                                                            <p>{subSection?.title}</p>
                                                            <p>{subSection?.timeDuration}</p>
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
                    <div className="pt-5 pb-10">
                        <div className="text-white text-2xl font-semibold font-inter">Author</div>
                        <div className="flex items-center gap-4 pt-2">
                            <img src={coursedetails?.course?.instuctor?.image} className="w-[50px] h-[50px] aspect-square rounded-full
                             object-cover"></img>
                            <div className="text-white">{coursedetails?.course?.instuctor?.FirstName} {coursedetails?.course?.instuctor?.LastName}</div>
                        </div>
                    </div>
            </div>
                
            </div>

            <Footer></Footer>
            

    </div>)
}

export default CourseDetails;