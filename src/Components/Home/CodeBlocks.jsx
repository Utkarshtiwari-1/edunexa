import CTAButton from "./CTAButton";
import { TypeAnimation } from "react-type-animation";

function CodeBlocks({position,heading,subheading, ctabtn1 ,ctabtn2,codeblock ,backgroundgradient ,codecolor}){
    return (
        <div className={`text-white flex gap-10 mx-auto mt-[100px] ${position} flex-wrap `}>
            {/*section 1*/}

            <div className=" lg:w-[50%] md:w-[70%] sm:w-[90%] flex flex-col flex-wrap  ">
             <div className="w-[80%]">
             <div className="text-3xl font-inter font-semibold">{heading}</div>
                 <div className="mt-4 text-richblack-100 ">{subheading}</div>
                <div className="flex gap-5 mt-12">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>{ctabtn1.children}</CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>{ctabtn2.children}</CTAButton>
                </div>
             </div>
        
                 
            </div>

            <div className={`w-[50%] flex border-t-0 border-l-0 border-richblack-25 ${codecolor} mx-auto lg:w-[500px] 
            `}>
                <div className="w-[5%] text-richblack-200 ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold pr-2 ${codecolor} `}>
                    <TypeAnimation sequence={[codeblock ,2000,""]} repeat={Infinity} style={
                       { whiteSpace: 'pre-line',
                        display:'block'}
                    } 
                    cursor={true}
                    omitDeletionAnimation={true}></TypeAnimation>
                </div>
            </div>

        </div>
    )
}

export default CodeBlocks;