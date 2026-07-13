import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profilepage(){

    const {user} = useSelector((state)=>state.profile);
    const navigate = useNavigate();
    return (
        <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl text-white font-semibold font-inter translate-x-[-100px]">My Profile</h1>
            <div className="flex justify-between mt-10 items-center min-h-[150px] pr-7 pl-2 bg-richblack-800 w-[70%] rounded-md border border-richblack-600">
                <div className="flex  items-center ">
                    <img src={user?.image} width={100} height={100} className=" aspect-square rounded-full"></img>
                    <div className="flex flex-col items-start ml-5">
                        <p className="text-xl text-white ">{user?.FirstName}{" "}{user?.LastName}</p>
                        <p className="text-richblack-300 text-sm">{user?.email}</p>
                    </div>
                </div>
                <div >
                    <button onClick={()=>{navigate("/dashboard/settings")}}
                    className=" px-2 py-1 bg-yellow-50 flex gap-3 rounded-md  items-center">
                        <FaEdit></FaEdit>
                        <p>Edit</p>
                    </button>
                </div>
            </div>

            <div className="flex justify-between mt-5 items-center h-[100px] pr-7 pl-2 bg-richblack-800 w-[70%] rounded-md border border-richblack-600">
                <div className="flex flex-col items-start pl-5 ">
                   <p className="text-2xl text-richblack-25 ">About</p>
                   <p className="text-sm text-richblack-300">{user?.additionalDetails?.about ?? "Write something about yourself.."}</p>
                </div>
                <div >
                    <button onClick={()=>{navigate("/dashboard/settings")}}
                    className=" px-2 py-1 bg-yellow-50 flex gap-3 rounded-md  items-center">
                        <FaEdit></FaEdit>
                        <p>Edit</p>
                    </button>
                </div>
            </div>

            <div className="flex flex-col  mt-5 items-center pr-7 pl-5 bg-richblack-800 w-[70%] rounded-md border border-richblack-600">
                <div className="flex flex-row w-full justify-between pt-5 ">
                    <p className="text-xl text-white">Personal Details</p>
                    <div >
                    <button onClick={()=>{navigate("/dashboard/settings")}}
                    className=" px-2 py-1 bg-yellow-50 flex gap-3 rounded-md  items-center">
                        <FaEdit></FaEdit>
                        <p>Edit</p>
                    </button>
                </div>
                </div>
                <div className="flex flex-row items-start w-full mt-4 pb-5">
                <div className="w-[50%] item-start text-white flex flex-col gap-y-5">
                    <div className="flex flex-col ">
                        <p className="text-sm text-richblack-400">First Name</p>
                        <p className="text-medium text-richblack-25">{user?.FirstName}</p>
                    </div>
                  
                    <div className="flex flex-col">
                        <p className="text-sm text-richblack-400">Email</p>
                        <p className="text-medium text-richblack-25">{user?.email}</p>
                    </div>
                </div>
                <div className="w-[50%]  text-white flex  flex-col items-start  gap-y-5">
                       <div className="flex flex-col">
                        <p className="text-sm text-richblack-400">Last Name</p>
                        <p className="text-medium text-richblack-25">{user?.LastName}</p>
                    </div>
                    <div className="flex flex-col ">
                        <p className="text-sm text-richblack-400">Phone number</p>
                        <p className="text-medium text-richblack-25">{user?.additionalDetails?.phoneNumber ?? "Set phone number"}</p>
                    </div>
                </div>
                </div>
                
            </div>

            
        </div>
    )
}

export default Profilepage;