import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import countrycode from "../../data/countrycode.json";
import {apiconnector} from "../../service/apiconnector";

import {endpoints} from "../../service/apis";
import toast from "react-hot-toast";

function Contactform(){

    const {CONTACTUS_API} = endpoints;

    const [loading,setloading] = useState();

      async  function submithandler(data){
       console.log(data);
       try {
        
        setloading(true);
        const {FirstName,LastName,email,Countrycode,Phonenumber,message} = data;
        const response = await apiconnector("POST",CONTACTUS_API,{FirstName,LastName,email,Countrycode,Phonenumber,message});

        console.log("contact us response",response);
        toast.success("Your response added succsessfully");
        setloading(false);
        
       } catch (error) {
         console.log(error);
         toast.error("Something went wrong");
         setloading(false);
       }

    }

    

    const {register, handleSubmit,reset,formState:{isSubmitSuccessful} } = useForm();

    useEffect(()=>{
        if(isSubmitSuccessful)
        {
            reset({
                email:"",
                FirstName:"",
                LastName:"",
                message:"",
            })
        }
    },[isSubmitSuccessful,reset]);
    return (
        <div className="flex flex-col justify-center text-white gap-y-3 pb-2">
            <form onSubmit={handleSubmit((data)=>submithandler(data))}>
                <div className="flex gap-x-8 lg:flex-row sm:flex-col ">
                    <div className="w-[50%]">
                    <label>
                        <p>First name</p>
                        <input type="text" name="FirstName" {...register("FirstName",{required:true})}
                        className="bg-richblack-500 rounded-md p-2 w-full"
                        placeholder="First Name"></input>
                    </label>
                    </div>
                    <div className="w-[50%]">
                    <label>
                        <p>Last name</p>
                        <input type="text" name="LastName" {...register("LastName",{required:true})}
                        className="bg-richblack-500 rounded-md p-2 w-full"
                        placeholder="Last Name"></input>
                    </label>
                    </div>
                   
                   
                </div>
                <div className="mt-3">
                    <label>
                        <p>Email address</p>
                        <input type="text" name="email" {...register("email",{required:true})}
                        className="bg-richblack-500 rounded-md p-2 w-full"
                        placeholder="Email address"></input>
                    </label>
                </div>
                <div className="mt-4">
                    <label>Phone Number</label>
                    <div className="flex lg:flex-row sm:flex-col gap-5">
                      
                            <select name="dropdown" {...register("Countrycode",{required:true})}
                            className="w-[12%] bg-richblack-500 rounded-md p-2">country code
                                {
                                    countrycode.map((element,index)=>{
                                        return(
                                            <option value={element.code}>
                                                {element.code}-{element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                      
                      
                            <input type="number" placeholder="123456789" 
                            {...register("Phonenumber",{required:true})} className="w-[85%] bg-richblack-500 rounded-md p-2 "></input>
                    
                    </div>
                </div>
                <div className="mt-3">
                    <label>
                        <p>Message</p>
                        <textarea type="text" name="message" {...register("message",{required:true})}
                        cols="30" rows="7" className=" w-full bg-richblack-500 rounded-md pl-3"
                        placeholder="asdfghjkl"></textarea>
                    </label>
                </div>
                <div className="mt-5">
                    <button type="submit" className="px-2 py-2 bg-yellow-100 w-full text-center
                    rounded-md text-black">Send Message</button>
                </div>

            </form>
        </div>
    )
}

export default Contactform;