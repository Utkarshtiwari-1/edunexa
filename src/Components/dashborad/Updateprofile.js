import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Updateprofile } from "../../service/operations";

function Updateyourprofile(){

    const dispatch = useDispatch();
    const {token} = useSelector((state)=>state.auth);
    const [formdata,setformdata] = useState({
        gender:"",DateofBirth: " ",about :" ",phoneNumber:"",Profession:""

    });

    function changehandler(event){
        setformdata((prev)=>{
            return{
                ...prev,
                [event.target.name]:event.target.value,
            };
        })
    }

    function submithandler(event){
        event.preventDefault();
        console.log(formdata);
        dispatch(Updateprofile(formdata,token));
    }
    return(
        <div className="flex  mt-10 items-center pr-7 pl-2  bg-richblack-800 w-[70%] rounded-md border border-richblack-600">
        
            <form onSubmit={submithandler} className="grid lg:grid-cols-2 sm:grid-cols-1 p-10 text-white gap-x-12 gap-y-4">
                <label>
                    <p className="text-sm mb-1">Profession</p>
                    <select value={formdata.Profession} name="Profession"
                    className="w-full bg-richblack-600 p-2 rounded-md"
                    onChange={changehandler}>
                        <option value={"Teacher"}>Teacher</option>
                        <option value={"Developer"}>Developer</option>
                        <option value={"student"}>student</option>
                        <option value={"Software Engineer"}>Software engineer</option>
                    </select>
                </label>
                <label>
                    <p className="text-sm mb-1">Date of Birth</p>
                    <input type="date" value={formdata.DateofBirth} name="DateofBirth"
                     className="w-full bg-richblack-600 p-2 rounded-md"
                     onChange={changehandler} ></input>
                </label>
                <label>
                    <p className="text-sm mb-1">Gender</p>
                    <select value={formdata.gender} name="gender"
                     className="w-full bg-richblack-600 p-2 rounded-md"
                     onChange={changehandler}>
                        <option value={"Male"}>Male</option>
                        <option value={"Female"}>Female</option>
                        <option value={"Other"}>Other</option>
                        
                    </select>
                </label>
                <label>
                    <p className="text-sm mb-1">Phone number</p>
                    <input type="number" value={formdata.phoneNumber} name="phoneNumber"
                     className="w-full bg-richblack-600 p-2 rounded-md"
                     onChange={changehandler}></input>
                </label>
                <label>
                    <p className="text-sm mb-1">About</p>
                    <input type="text" value={formdata.about} name="about"
                     className="w-full bg-richblack-600 p-2 rounded-md"
                     onChange={changehandler}></input>
                </label>

                <button type="submit" className="px-2  w-[40%] h-[50px] rounded-md   bg-yellow-50 text-black">Save</button>
            </form>
        </div>

    )
}

export default Updateyourprofile;