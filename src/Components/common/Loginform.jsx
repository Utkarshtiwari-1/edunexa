import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginuser } from '../../service/operations';


export const Loginform = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const[formdata,setformdata] = useState({
        email:"",
        password:"",
    
    })

    const[showpassword,setshowpassword] = useState(false);

    function changehandler(event)
    {
        setformdata((prevdata) =>({
            ...prevdata,
            [event.target.name]:event.target.value

        }))
    }

    const{email,password} = formdata;

    function submithandler(event)
    {
        event.preventDefault();
       
        dispatch(loginuser(email,password,navigate));
    }

  return (
    <form onSubmit={submithandler} className='flex flex-col gap-y-3'>
        <label>
            <p>Email Address <sup className=' text-red-500 '>*</sup></p>
            <input type='text' value={formdata.email} name='email'
            onChange={changehandler} required
            className='w-[450px] h-[44px] bg-[#161D29] rounded-md mt-3 shadow-[2px_-1px_0px_rgba(255, 255, 255, 0.18)] '></input>
        </label>
        <label>
            <p>Password <sup className=' text-red-500 '>*</sup></p>
            <input value={formdata.password} name='password' type={
                showpassword?("text"):("password")
            } onChange={changehandler}
            className='w-[450px] mt-3 h-[44px] bg-[#161D29] rounded-md'></input>
            <span
            className='absolute top-[380px] translate-x-[420px] cursor-pointer' onClick={()=>setshowpassword((prev) => !prev)}>
                {
                    showpassword?(<AiOutlineEyeInvisible />):(<AiOutlineEye />)
                }
            </span>
            <Link to="/forgotpassword">
                <p className="flex justify-end text-[15px] text-[#47A5C5] mt-1">forgot password</p>
            </Link>
        </label>

        <button 
        className='bg-yellow-50 py-[8px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900'>Sign in</button>

    </form>
  )
}
