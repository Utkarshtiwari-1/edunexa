import { useState,useEffect } from "react"
import {GiCancel} from "react-icons/gi";
import { useSelector } from "react-redux";

function Requirementfeild({name,label,register,setValue})
{   

    const {course ,editCourse}  = useSelector((state)=>state.course);

    const [requirement,setrequirement] = useState('');
    const [reqlist,setreqlist] = useState([]);

    function addrequirement(){
        if(requirement)
        {
            setreqlist([...reqlist,requirement]);
            setrequirement("");
        }
    }

    function removerequirement(index){
        const newreqlist = [...reqlist];
        newreqlist.splice(index,1);
        setreqlist(newreqlist);
    }

    useEffect(() => {
        if (editCourse) {
            setreqlist(course?.instructions)
        }
        register(name);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
    
      useEffect(() => {
        setValue(name, setreqlist)
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [setreqlist])


    return(
        <div>
            <label htmlFor={name} className="text-richblack-100 text-sm">{label}<sup className="text-pink-500">*</sup></label>
            <input name={name} onChange={(e)=>setrequirement(e.target.value)}
            className="w-full text-white pl-4 bg-richblack-800  rounded-md p-2"
             value={requirement}></input>
            <div className=" mt-1 font-semibold text-yellow-50 cursor-pointer"
            onClick={addrequirement}>Add</div>
            {
                reqlist && reqlist.length>0 && 
                <div>
                    {
                        reqlist.map((req,index)=>{
                            return(
                                <div key={index} className="flex gap-1 items-center text-richblack-200">
                                    <p className="text-richblack-100">{req}</p>
                                    <GiCancel className="text-sm cursor-pointer"
                                    onClick={()=>removerequirement(index)}></GiCancel>
                                </div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}

export default Requirementfeild;