
import { Outlet } from "react-router-dom";
import VideoDetailsSidebar from "../Components/videolecturesviewer/VideoDetailsSidebar";
import { useState } from "react";
import Reviewmodal from "../Components/videolecturesviewer/Reviewmodal"

function Viewcourse()
{
    const [reviewmodal,setreviewmodal] = useState(false);
    
    return(
        <div className="w-full">
            <div className="relative flex min-h-[calc(100vh-3rem)]">
            
                <VideoDetailsSidebar setreviewmodal={setreviewmodal}></VideoDetailsSidebar>
           
            <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
                <div className="mx-auto w-11/12 max-w-[1000px] py-1">
                 <Outlet></Outlet>
                </div>
                
            </div>
        </div>
        {
            reviewmodal && (<Reviewmodal setreviewmodal={setreviewmodal}></Reviewmodal>)
        }
        </div>
    )
}

export default Viewcourse;