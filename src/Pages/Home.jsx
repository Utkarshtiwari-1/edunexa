import React, { Children } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRightToBracket } from "react-icons/fa6";
import HighlightText from '../Components/Home/HighlightText';
import CTAButton from '../Components/Home/CTAButton';
import Bideo from '../assets/Images/banner.mp4'
import CodeBlocks from '../Components/Home/CodeBlocks';
import LineData from '../Components/Home/LineData';
import Timelineimage from "../assets/Images/TimelineImage.png"
import ThreeImages from "../Components/Home/ThreeImages";
import InstructorPage from '../Components/Home/InstructorPage';
import Tagcomponent from '../Components/Home/Tagcomponent';
import Footer from '../Components/common/Footer';
import RatingandReviewslider from '../Components/common/RatingandReviewslider';

export const Home = () => {
  return (
    <div >
        <div className='relative mx-auto flex flex-col justify-between w-11/12 '>
          
            <div className='mx-auto rounded-full mt-16 p-1 w-[250px] bg-richblack-800 font-bold text-richblack-200 transition-all duration-100 
            hover:scale-95'>
            <Link to={"/signup"}>
              <div className='text-white flex justify-center gap-3 items-center p-2'>
                <p>Become an Instructor</p>
                <FaArrowRightToBracket></FaArrowRightToBracket>
              </div>
              </Link>
            </div>
         
        </div>

        <div className='flex text-white gap-1  justify-center items-center  flex-wrap mt-10 text-3xl font-bold '>
        <div >
          Empower Your Future With <HighlightText text={" Coding Skills"}></HighlightText>
        </div>
        
        </div>

        <div className=' text-richblack-300 lg:w-9/12 md:w-10/12 sm:w-11/12 mx-auto mt-5  text-center '>
        With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex mx-auto gap-9 justify-center mt-9'>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
          <CTAButton active={false} linkto={"/signup"}>Book a demo</CTAButton>
        </div>

        <div className=' relative w-11/12 mx-auto  my-[48px] '>
        
       
        <video loop autoPlay muted src={Bideo} >

         </video>
        </div>
         
       <div className='w-11/12 mx-auto'>
       <CodeBlocks heading={
        <div>
          Unlock your {" "}
          <HighlightText text={"coding potential"}></HighlightText>  with our online courses.
        </div>
       }
       position={"flex-row"}
       codecolor={"text-richblack-300"}
       subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
       ctabtn1={{active:"true",children:"Try it Yourself",linkto:"/login"}}
       ctabtn2={{active:false,children:"Learn More",linkto:"/login"}}
       codeblock={`<!DOCTYPE html>\n<html>\n head><title>Example \n </title><linkrel="stylesheet"href="styles.css">\n  /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two</ \n a><ahref="three/">Three</a>\n /nav>`}>

       </CodeBlocks>
       </div>

       <div className='mt-20'>
       <CodeBlocks heading={
        <div>
          Start  {" "}
          <HighlightText text={"coding in seconds"}></HighlightText> 
        </div>
       }
       position={"flex-row-reverse"}
       codecolor={"text-richblack-300"}
       subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
       ctabtn1={{active:"true",children:"Continue Lesson",linkto:"/login"}}
       ctabtn2={{active:false,children:"Learn More",linkto:"/login"}}
       codeblock={`<!DOCTYPE html>\n<html>\n head><title>Example \n </title><linkrel="stylesheet"href="styles.css">\n  /head> \n body> \n h1><ahref="/">Header</a> \n /h1> \n nav><ahref="one/">One</a><ahref="two/">Two</ \n a><ahref="three/">Three</a>\n /nav>`}>

       </CodeBlocks>
       </div>

       <div className='text-white pt-40 pb-10 '>
        <Tagcomponent></Tagcomponent>

       </div>

       <div className='bg-white'>
        <div className='checkimage h-[300px] flex justify-center items-center gap-6'>
          <CTAButton active={true} linkto={"/signup"} >
            <div className='flex items-center gap-2'>
              <div>Explore Full Catalog</div>
              <FaArrowRightToBracket></FaArrowRightToBracket>
            </div>
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>Learn More</CTAButton>
        </div>
       </div>

       <div className='bg-white'>
       <div className='w-11/12 flex mx-auto gap-20 justify-center pt-16 pb-16 flex-wrap'>
        <div className='text-3xl font-semibold font-inter lg:w-[35%] sm:w-[100%]'>Get the Skill You need for a <HighlightText text={"job that is in demand"}></HighlightText></div>
        <div className='flex flex-col items-start lg:w-[40%] sm:w-[100%] gap-3'>
          <div className='text-richblack-500 text-sm' >The modern Edunexa is the dicates its own terms ,today to be a competative Spacilist requires more than professional skills</div>
          <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
        </div>
       </div>
       </div>

       <div className='bg-white '>
        <div className=' pt-9 pb-9 w-10/12 mx-auto flex items-center justify-evenly gap-[100px] flex-wrap'>
          <LineData></LineData>
          <div className='relative '>
            <div className='lg:w-[500px]  object-cover '>
              <img src={Timelineimage}></img>
            </div>
            <div  className='flex bg-caribbeangreen-800 text-white w-[70%] mx-auto h-20 p-3 
            absolute  -bottom-8 left-[15%] '>
              <div className='flex  w-[50%] justify-center items-center gap-3 border-r-2 border-caribbeangreen-200'>
                <p className='text-2xl font-bold'>10</p>
                <p className=' text-caribbeangreen-200 text-xs  px-4'>Year of experience</p>

              </div>
              <div className='flex  w-[50%] justify-center items-center gap-3'>
                <p className='text-2xl font-bold pl-3'>250</p>
                <p className=' text-caribbeangreen-200 text-xs  px-4'>Types of courses</p>
              </div>
            </div>
          </div>
        </div>
       </div>

       <div  className='bg-white'>
        <ThreeImages></ThreeImages>
       </div>

       <div >
          <InstructorPage></InstructorPage>
       </div>
      
      <div className='mx-auto text-white w-11/12 flex   justify-center pt-20 pb-5'>
        <div className='text-3xl font-inter font-semibold'>Reviews From other Learners</div>
        
      </div>
      <div className='w-10/12 mx-auto pb-8'>
          <RatingandReviewslider></RatingandReviewslider>
      </div>
      
       
      
       <div>
        <Footer></Footer>
       </div>


        
    </div>
  )
}
