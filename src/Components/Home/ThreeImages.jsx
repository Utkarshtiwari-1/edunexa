import HighlightText from "./HighlightText";
import img2 from "../../assets/Images/Compare_with_others.png";
import img1 from "../../assets/Images/Know_your_progress.png";
import img3 from "../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

function ThreeImages(){
    return(
        <div className="w-11/12 mx-auto flex flex-col items-center pt-32 pb-20">
            <div className="text-3xl font-inter font-semibold">Your Swiss knife for  {" "}<HighlightText text={"learning any language"}></HighlightText></div>
            <div className="w-[45%] pt-3 text-center text-sm text-richblack-700">using spin making learning multiple languages easy. with 20+ languages realstic voice 
            over, progress tracking, custom schedule and more.</div>
            <div className="flex lg:flex-row  md:flex-col sm:flex-col pt-6 ">
                <img src={img1} className=" object-contain lg:translate-x-28 "></img>
                <img src={img2} className=" object-contain z-10"></img>
                <img src={img3} className=" object-contain lg:-translate-x-36 z-30"></img>
            </div>
            <div className="pt-4">
                <CTAButton linkto={"/signup"} active={true}>Learn More</CTAButton>
            </div>
        </div>
    )
}

export default ThreeImages;