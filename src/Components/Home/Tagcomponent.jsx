import HighlightText from "./HighlightText";
import { HomePageExplore } from "../../data/homepage-explore";
import { useState } from "react";
import { LuUsers2 } from "react-icons/lu";
import { GiLever } from "react-icons/gi";

const tabsName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skill paths",
    "Career paths",
];


function Tagcomponent(){

    const [currenttab ,setcurrenttab] = useState(tabsName[0]);
    const [course,setcurrentcourse] = useState(HomePageExplore[0].courses);
    const[currentcard ,setcurrentcard] = useState(HomePageExplore[0].courses[0].heading)

    function ClickHandler(element){
        setcurrenttab(element);

        const currentdata = HomePageExplore.filter((data)=>data.tag===element);

        setcurrentcourse(currentdata[0].courses);
        setcurrentcard(currentdata[0].courses[0].heading);
    }

    return(
        <div className='w-11/12 mx-auto flex flex-col items-center   '>
        <div className='w-11/12 mx-auto flex flex-col items-center'>
        <div className='text-3xl font-inter font-semibold'>Unlock the <HighlightText text={"Power of Code"}></HighlightText> </div>
          <div className='text-sm text-richblack-500 pt-2'>Learn to build anything you can imagine</div>
          <div className="flex gap-3 px-3 py-2 rounded-full bg-richblack-800 mt-7">{
                tabsName.map((element,index)=>{
                    return(
                        <div key={index}
                        onClick={()=>ClickHandler(element)} className={`cursor-pointer px-3 py-2 rounded-full 
                       ${currenttab===element?"bg-richblack-900 text-richblack-5 font-medium":"text-richblack-200"}`}>{element}</div>
                    )
                })
            }  
          </div>
        </div>
          
            
            <div className="lg:flex w-11/12 justify-center items-center gap-6 pt-5  sm:flex-wrap md:flex-wrap  ">
                {
                    course.map((element,index)=>{
                        return(
                            <div key={index} className={`pl-5 pr-5 ${currentcard===element.heading?"bg-white text-black"
                            :"bg-richblack-800 text-white"} lg:w-[25%] md:w-[90%] sm:w-[90%] p-5`} >
                                <div className="font-semibold font-inter text-xl ">{element.heading}</div>
                                <div className="pt-3 pb-12 text-richblack-500">{element.description}</div>
                                <div className="h-[1px]  border-t  border-dashed border-richblack-600 "></div>
                                <div className={`flex justify-between pt-3 ${currentcard===element.heading?" text-richblue-500":"text-richblack-300"}`}>
                                    <div className="flex  justify-center items-center gap-2">
                                    <div>
                                    <LuUsers2></LuUsers2>  
                                    </div>
                                    <div>
                                    {element.level}
                                    </div></div>
                                    <div className="flex  justify-center items-center gap-2">
                                    <div>
                                        <GiLever></GiLever>
                                    </div>
                                    <div>
                                      {element.lessionNumber} {" "} Lessons
                                    </div></div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
}

export default Tagcomponent;