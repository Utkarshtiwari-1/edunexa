import { useDispatch, useSelector } from "react-redux";
import GetAvgRating from "../Utils/avgRating";
import RatingStars from "../Components/common/RatingStars";
import { MdDelete } from "react-icons/md";
import { removefromcart, settotalItems } from "../slices/cartslice";
import toast from "react-hot-toast";
import { buycourse } from "../service/operations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { resetcart } from "../slices/cartslice";

function Mycart()
{
    const {totalItems,cartitems,totalPrice} = useSelector((state)=>state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {token} = useSelector((state)=>state.auth);
    const {user}  = useSelector((state)=>state.profile);
    const [courses,setcourses] = useState([]);

    function removefromcarthandler(courseid)
    {
        dispatch(removefromcart(courseid));
        dispatch(settotalItems());
        toast.success("Item removed succsessfully");
    }

    useEffect(()=>{
        cartitems.length>0 && cartitems.forEach((course)=>{
            setcourses([...courses,course._id]);
        })
    },[]);

    async function handlebuycourse()
    {
        if(token)
        {
          await buycourse(token,courses,user,navigate,dispatch,setcourses);

        }
        else{
            toast.error("Login first");
        }
        
        
    }

    return(
        <div>
            <div className="w-10/12 mx-auto">
                <div className="text-3xl font-inter font-semibold text-white mt-8">My Wishlist</div>
                <div className="text-richblack-200 mt-6">{totalItems} Courses in Wishlist</div>
                <div className="h-[1px] w-full bg-richblack-500 mt-2"></div>
                <div className="flex  gap-16">
                    <div className=" lg:w-[70%]">
                        {
                            totalItems>0? (
                                cartitems.map((course)=>(
                                    
                                    <div className="mt-2 mb-2 flex gap-3 text-white justify-between p-3 border-b border-blue-700">
                                        <div className="flex gap-4">
                                            <img src={course.thumbnail} className="h-[120px] w-[200px] object-cover
                                            rounded-md"></img>
                                            <div className="flex flex-col gap-2">
                                                <div>{course?.courseName}</div>
                                                <div>{course?.instuctor?.FirstName}</div>
                                                <div className="flex gap-1" >
                                                    <span>{GetAvgRating(course?.ratingAndReviews)}</span>
                                                    <RatingStars Review_Count={course?.ratingAndReviews?.length} />
                                                    
                                                </div>
                                                <div>Total Courses • Lesson • Beginner</div>
                                            </div>
                                        </div>
                                        <div>
                                            <button className="flex items-center gap-2 px-2 py-1 bg-richblack-700
                                            rounded-md text-pink-300"
                                            onClick={()=>removefromcarthandler(course?._id)}>
                                                <MdDelete></MdDelete>
                                                <p>Remove</p>
                                            </button>
                                            <div className="text-yellow-50 text-2xl font-semibold mt-4">Rs. {course?.Price}</div>
                                        </div>
                                    </div>
                                ))
                            ):(
                                <div className="text-xl text-white pt-10 font-semibold text-center">
                                    No courses in cart Yet
                                </div>
                            )
                        }
                    </div>
                    {
                        totalItems>0 && (
                                    <div className="p-3 pl-7 mt-4 w-[20%] bg-richblack-700 rounded-md flex flex-col items-start
                            max-h-[150px]">
                                <div className="text-richblack-400">Total:</div>
                                <div className="text-2xl font-inter font-semibold text-yellow-50">Rs. {totalPrice}</div>
                                <button className="bg-yellow-50 px-2 py-2 rounded-md text-black w-full mt-4"
                                onClick={handlebuycourse}>Buy now</button>
                            </div>

                        )
                    }
                    
                </div>
            </div>
        
        </div>
    )
}

export default Mycart;