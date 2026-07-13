import { useDispatch, useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { useState } from "react";
import {updateDisplayPicture} from "../service/operations";
import Updateyourprofile from "../Components/dashborad/Updateprofile";
import Deleteyouraccount from "../Components/dashborad/Deleteaccount";

function Settingpage(){

    const [file,setfile] = useState(null);
    const [loading,setloading] = useState(false);
    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const {user} = useSelector((state)=>state.profile);

    function handlefilechange(event){

        const imgfile = event.target.files[0];

        if(imgfile)
        {
            setfile(imgfile);
        }
    }

    function submithandler(){
        try {
            setloading(true);
            const formdata = new FormData();
            formdata.append("displayPicture",file);
            console.log("append ho gya");
            dispatch(updateDisplayPicture(token,formdata));
            setloading(false);
        } catch (error) {
            console.log("error while dispatching profilepic",error);
        }
    }

    
    return(
        <div className="flex flex-col justify-center items-start">
            <h1 className="text-3xl text-white font-semibold font-inter">Edit Profile</h1>
            <div className="flex  mt-10 items-center pr-7 pl-2 h-[100px] bg-richblack-800 w-[70%] rounded-md border border-richblack-600">
                <div className="flex  items-center ">
                    <img src={user?.image} width={80} height={80} className=" aspect-square rounded-full"></img>
                    
                </div>
                <div className="flex flex-col gap-4 items-start ml-5">
                <p className="text-white ">Change Profile Picture</p>

                <div className="flex justify-between gap-5">

                    <div className="px-2 py-1 bg-pink-100 rounded-md ">
                    <label className="text-white" htmlFor="fileupload">
                        Select
                    </label>
                    <input type="file" id="fileupload"
                        onChange={handlefilechange}></input>
                    </div>
                      
                    {
                        file &&   <button onClick={submithandler}  className="px-2 py-1 rounded-md text-black bg-yellow-50">Save</button>
                    }
                  
                </div>
                    
                </div>
            </div>
            <Updateyourprofile></Updateyourprofile>
            <div className="w-[70%]">
                <Deleteyouraccount></Deleteyouraccount>
            </div>
        </div>
    )
}

export default Settingpage;