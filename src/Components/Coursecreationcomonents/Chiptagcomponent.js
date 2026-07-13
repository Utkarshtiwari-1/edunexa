import { useEffect, useState } from "react";
import { GiCancel } from "react-icons/gi";

function Chiptagcomponent({label,name,register,setValue}){

    const [tag,settag] = useState('');
    const [taglist,settaglist] = useState([]);

    function submithandler(e){
        if(e.key==='Enter' &&  tag)
        {
            e.preventDefault();
            console.log("tag",tag);
            settaglist(oldarray => [tag,...oldarray]);
            settag("");
           
        }

        
    }

    function removeitem(index){
        const newtaglist = [...taglist];
        newtaglist.splice(index,1);
        settaglist(newtaglist);

    }

    useEffect(()=>{
        register(name);
    },[]);

    //,{ required: true, validate: (value) => value.length > 0 }

    useEffect(()=>{
        setValue(name,taglist);
    },[taglist]);

    return(
        <div>
           
            <div>
            <label  htmlFor={name} className="text-richblack-100 text-sm pb-2">{label}<sup className="text-pink-500">*</sup></label>
            {
                taglist.length>0 && 
            <div className="flex flex-row flex-wrap gap-2 pt-2 pb-2 ">
            {
                taglist.length && taglist.map((tags,index)=>{
                    return(
                        <div className="flex gap-1 p-[3px] items-center rounded-md bg-yellow-300" key={index}>
                            <p>{tags}</p>
                            <GiCancel onClick={()=>removeitem(index)}
                                className=" cursor-pointer"
                            ></GiCancel>
                        </div>
                    )
                })
            
            }
            </div>
           }
            <input name={name}  className="w-full text-white pl-4 bg-richblack-800 rounded-md p-2"
            onChange={(e)=>settag(e.target.value)} value={tag} onKeyDown={submithandler}></input>
            </div>
        </div>
    )
}

export default Chiptagcomponent;