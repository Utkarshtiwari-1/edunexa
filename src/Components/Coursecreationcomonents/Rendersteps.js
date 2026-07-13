import { useSelector } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { IoTerminalSharp } from "react-icons/io5";
import Coursebuilderform from "./Coursebuilderform";
import Courseinfoform from "./Courseinfoform";
import Publishform from "./Publishform";

function Rendersteps(){

    const steps = [
        {
            id:1,
            title:"Course Information",
        },
        {
            id:2,
            title:"Course Builder",
        },
        {
            id:3,
            title:"Publish",
        }
    ];

    const {step} = useSelector((state)=>state.course);

    return(
        <div className="w-full">
            <div className="flex ml-5 mr-6 justify-between mt-10">
                {
                    steps.map((item)=>{
                        return(
                            <div className="w-full">
                            <div className="w-full flex items-center">
                            <div className={`${step===item.id ? " bg-yellow-900 text-yellow-50 border border-yellow-50"
                             : " bg-richblack-800 border border-richblack-700 text-richblack-300"}
                             w-[40px] h-[40px] rounded-full flex items-center justify-center `}>
                                {
                                    step>item.id?(<FaCheckCircle></FaCheckCircle>):(<p>{item.id}</p>)
                                }
                            </div>
                            {
                                item.id<3 && <div className={`${step>item.id ? "border border-dashed border-yellow-50"

                                 : " border border-dashed border-richblack-600"} h-[1px]
                                 w-[80%] `} ></div>
                            }
                            </div>
                            <div className="text-white text-sm mt-1">{item.title}</div>
                            </div>
                            
                            
                            
                        )
                    })
                }
            </div>
            {
                step===1 && <Courseinfoform></Courseinfoform>
            }
            {
                step===2 && <Coursebuilderform></Coursebuilderform>
            }
            {
                step===3 && <Publishform></Publishform>
            }
            
        </div>
    )
}

export default Rendersteps;