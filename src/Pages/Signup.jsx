import React from 'react'
import { Template } from './Template'
import signupImg from "../assets/Images/signup.webp";

const Signup = () => {
  return (
    <div className='h-full bg-[rgb(0,8,20)] sm:w-full w-full'>
      <Template
      title="Join the millions learning to code with Edunexa for free"
      desc1="Build skills for today, tomorrow, and beyond."
      desc2="Education to future-proof your career."
      image={signupImg}
      formtype="signup"
     ></Template> 
    </div>
  )
}

export default Signup;
