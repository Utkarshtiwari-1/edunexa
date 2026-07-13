import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Player } from "video-react";
import 'video-react/dist/video-react.css';
import { markleccompleted } from "../../service/operations";


function VideoDetails()
{
    const playerRef = useRef();
    const {currentsubsection,courseEntireData,completedLectures} = useSelector((state)=>state.viewCourse); 
    const [videoEnded, setVideoEnded] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    useEffect(()=>{


        setVideoEnded(false);
    },[currentsubsection])

    function makecompletehandler()
    {
       const result =  markleccompleted(courseEntireData._id,currentsubsection._id,token);
       if(!result)
        {
            toast.error("Not marked");
        }
        setVideoEnded(false);
    }
   
    return(
        <div className=" min-w-[1000px]">
            {
               currentsubsection.length===0?(
                <div>No Data found</div>
               ) :(
                <div className="relative z-0">
                <Player
                ref = {playerRef}
                aspectRatio="14:9"
                playsInline
                onEnded={() => setVideoEnded(true)}
                src={currentsubsection?.videourl}>

                </Player>
                {
                    videoEnded && !completedLectures.includes(currentsubsection?._id) &&  (
                        <div className="absolute top-[50%] left-[50%] z-30 ">
                            <button className="px-2 py-1 bg-yellow-50 text-black
                            rounded-md shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] "
                            onClick={makecompletehandler}>Mark as completed</button>
                        </div>
                    )
                }
                </div>
               )
            }
        </div>
    )
}

export default VideoDetails;