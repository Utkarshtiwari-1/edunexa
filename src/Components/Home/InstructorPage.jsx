import { FaArrowRight } from "react-icons/fa6";
import Instuctor from "../../assets/Images/Instructor.png";
import CTAButton from "./CTAButton";
import HighlightText from "./HighlightText";

function InstructorPage(){
    return(
        <div className="w-11/12 flex lg:flex-row md:flex-col sm:flex-col mx-auto pt-20  gap-32">
            <div className="aspect-square">
                <img src={Instuctor} alt="Instructor illustration"></img>
            </div>
            <div className="text-white w-[34%] flex flex-col justify-center items-centers">
                <div className="text-3xl font-inter font-bold"> Become an {" "} <br></br> <HighlightText text={"Instuctor"}></HighlightText></div>
                <div className="text-sm text-richblack-400 w-[88%] pt-2">Instuctors from the arounfd the world teach millions of students on Edunexa
                . we provide the tools and skills to teach what you love</div>
                <div className="pt-20 flex flex-row">
                <CTAButton linkto={"/signup"} active={true}>Start Teaching Today <FaArrowRight></FaArrowRight></CTAButton>
                </div>
            </div>
            
        </div>
    )
}

export default InstructorPage;