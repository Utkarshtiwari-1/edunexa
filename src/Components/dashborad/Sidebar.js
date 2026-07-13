import {sidebarLinks} from "../../data/dashboard-links";
import {Logoutuser} from "../../service/operations";
import Sidebarlinks from "./Sidebarlink";
import { useDispatch, useSelector } from "react-redux";
import { IoSettingsOutline } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { NavLink } from "react-router-dom";
import { matchPath } from "react-router-dom";

function Sidebar(){

    const{loading:authloading} = useSelector((state)=>state.auth);
    const{loading:profileloading, user} = useSelector((state)=>state.profile);
    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    function MatchRoute(route){
        return matchPath({path:route},location.pathname);
    }

    const[confirmationmodal,setconfirmationmodal] = useState(null);

    if(profileloading || authloading)
    {
        return(
            <div className="spinner"></div>
        )
    }

    return(
        <div className="relative z-0 ">
            <div className="flex flex-col min-w-[200px]  border-r-[1px] border-r-richblack-300 
            bg-richblack-800  min-h-[calc(100vh-3rem)] pt-10 ">
               <div className="flex flex-col gap-y-2 ">
                {
                    sidebarLinks.map((element)=>{
                        console.log(element.type);
                        if(element.type && user.accountType!==element.type)
                        {
                            console.log("andar",user.accountType);
                            return null;
                        }
                        return(
                           <Sidebarlinks key={element.id} element={element} iconname={element.icon}></Sidebarlinks>
                    
                        )
                    })
                }
               </div>

               <div className="h-[1px] bg-richblack-300 mt-5 ml-2 mr-2"></div>

               <div className="mt-5">
               <NavLink to="/dashboard/settings" 
               className={`${MatchRoute("/dashboard/settings")?"text-black":"text-white"}
                text-sm font-medium `}>
                <div className={`${MatchRoute("/dashboard/settings")?" bg-brown-100":"text-white"} flex flex-row
                 items-center gap-2 px-8 py-2`}>
                    <IoSettingsOutline className="text-lg"></IoSettingsOutline>
                    <span>Settings</span>
                </div>
            </NavLink>
               </div>

               <div className={`px-8 py-2  cursor-pointer flex items-center text-white gap-2 mt-1
               ${confirmationmodal?" bg-brown-200 text-black":" text-white"}`}
               onClick={()=>{setconfirmationmodal({text1:"Are You sure",
               text2:"click on logout button for logout",
               btn1text:"Log out",
               btn2text:"Close",
               btn1handler:()=>{dispatch(Logoutuser(navigate))},
               btn2handler:()=>{setconfirmationmodal(null)}})}}>
                    <VscSignOut className="text-lg"></VscSignOut>
                    <span>Log out</span>
               </div>
            </div>
           
            {
                confirmationmodal && <ConfirmationModal modaldata={confirmationmodal}></ConfirmationModal>
            }
           
            
        </div>
    )
}

export default Sidebar;