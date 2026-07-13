import React from 'react';
import dashimg from '../assets/Images/frame.png';
import Signupform from '../Components/common/SignupForm';
import { Loginform } from '../Components/common/Loginform';
import { FcGoogle } from "react-icons/fc";

export const Template = ({title, desc1, desc2, image, formtype}) => {
  return (
    <div className='flex flex-col lg:flex-row text-white justify-evenly flex-wrap w-full'>
        <div className='flex flex-col gap-y-4 mt-16 pl-5 sm:w-full lg:w-[450px]'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            <p>
                <span className='text-xl text-[#AFB2BF]'>{desc1}</span>
                <br />
                <span className='text-xl text-[#47A5C5]'>{desc2}</span>
            </p>
            {formtype === "signup" ? (<Signupform />) : (<Loginform />)}
            <div className='flex items-center gap-x-2'>
                <div className='h-[1px] w-full bg-[rgb(44,51,63)]'></div>
                <p>OR</p>
                <div className='h-[1px] w-full bg-[rgb(44,51,63)]'></div>
            </div>
            <button className='py-2 px-3 rounded-2xl mt-6 font-medium text-white border'>
                <div className='flex justify-center items-center gap-x-2'>
                    <FcGoogle className='text-xl' />
                    <p>Sign in with Google</p>
                </div>
            </button>
        </div>
        <div className='relative mt-10 lg:mt-20'>
            <img className='z-10' src={dashimg} alt='pattern' height={578} width={498} loading='lazy' />
            <img className='z-50 absolute -top-4 right-4' src={image} alt='logo' height={578} width={489} loading='lazy' />
        </div>
    </div>
  );
}
