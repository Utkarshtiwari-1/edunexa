import HighlightText from "../Components/Home/HighlightText";
import about1 from "../assets/Images/aboutus1.webp";
import about2 from "../assets/Images/aboutus2.webp";
import about3 from "../assets/Images/aboutus3.webp";
import image1 from "../assets/Images/FoundingStory.png";
import LearingGrid from "../Components/common/LearningGrid";
import Getintouchform from "../Components/common/Getintouchform";
import Footer from "../Components/common/Footer";


function Aboutus(){

    const stripdata = [
        {
            count:"5K",
            label:"Active Students"
        },
        {
            count:"10+",
            label:"Mentor"
        },
        {
            count:"200+",
            label:"Courses"
        },
        {
            count:"50+",
            label:"Awards"
        },

    ]

    return(
        <div className="w-full">
        {/* section1 */}

            <div className="w-11/12 mx-auto mt-20 flex flex-col  items-center">
                <div className="text-3xl  w-[50%] text-center font-semibold font-inter text-white">Driving Innovation in Online Education for a 
                {" "}<HighlightText text={"Brighter Future"}></HighlightText></div>
                <div className="text-sm text-richblack-300 text-center w-[50%] mt-6">Edunexa is at the forefront of driving innovation in online education.
                 We're passionate about creating a brighter future by offering cutting-edge courses, 
                 leveraging emerging technologies, and nurturing a vibrant learning community.</div>
                 <div className="flex lg:flex-row sm:flex-col gap-6 mt-10">
                    <img src={about1}></img>
                    <img src={about2}></img>
                    <img src={about3}></img>
                 </div>
            </div>

            {/* section2 */}

            <div className="w-11/12 mx-auto flex flex-col items-center mt-20">
                <div className="text-white text-3xl font-semibold w-[80%] text-center">We are passionate about revolutionizing the way we learn.
                 Our innovative platform {" "} <HighlightText text={"combines technology"}></HighlightText>, 
                {" "} <span className=" text-brown-300">expertise</span>, and community to create an {" "}
                <span className=" text-brown-300"> unparalleled educational experience.</span>
                </div>
            </div>

            {/* section3 */}
            <div className="mt-32 pb-32">
                <div className="flex lg:flex-row sm:flex-col text-white w-11/12 mx-auto justify-center gap-x-36">
                    <div className="flex flex-col items-start lg:w-[30%] md:w-[60%] sm:w-[90%]">
                      <h1 className="text-center text-pink-600 text-2xl font-semibold pb-3">Our Founding Story</h1>
                        <p className="text-sm text-richblack-300 ">Our e-learning platform was born out of a shared vision and passion for transforming education.
                         It all began with a group of educators, technologists, and lifelong learners who recognized the need
                         for accessible, flexible, and high-quality learning opportunities in a rapidly evolving 
                         digital world.</p>
                         <br></br>
                         <p className="text-sm text-richblack-300 ">As experienced educators ourselves, we witnessed firsthand the limitations
                          and challenges of traditional education systems. We believed that education should not be 
                          confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform
                           that could bridge these gaps 
                         and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <div>
                        <img src={image1}></img>
                    </div>
                </div>
                <div className="flex lg:flex-row  mt-20 sm:flex-col text-white w-11/12 mx-auto justify-center gap-x-44">
                    <div className="flex flex-col items-start lg:w-[30%] md:w-[60%] sm:w-[90%]">
                      <h1 className="text-center text-brown-500 text-2xl font-semibold pb-3">Our Vision</h1>
                        <p className="text-sm text-richblack-300 ">With this vision in mind, we set out on a journey to 
                        create an e-learning platform that would revolutionize the way people learn. Our team of dedicated
                         experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with
                         engaging content, fostering a dynamic and interactive learning experience.</p>
                         
                         
                    </div>
                    <div className="lg:w-[30%] md:w-[60%] sm:w-[90%] flex flex-col items-start">
                    <h1 className="text-center text-blue-300 text-2xl font-semibold pb-3">Our Misson</h1>
                        <p className="text-sm text-richblack-300 ">our mission goes beyond just delivering courses online. We wanted to 
                        create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another.
                         We believe that knowledge thrives in an environment of sharing 
                        and dialogue, and we foster this spirit of collaboration through forums, live sessions, and 
                        networking opportunities.</p>
                         
                    </div>
                </div>
            </div>

            {/* section4 */}
            <div className=" bg-richblack-700 w-full">
                <div className="w-10/12 flex items-center pt-10 pb-10 text-white mx-auto justify-center gap-x-44 ">
                    {
                        stripdata.map((element,index)=>{
                            return (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="text-xl font-inter  font-semibold">{element.count}</div>
                                    <div className="text-richblack-200 text-sm">{element.label}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>

            {/* section5 */}
            <div>
                <div className="w-10/12 mx-auto mt-16">
                <LearingGrid></LearingGrid>

                </div>
            </div>

            {/* section5 */}
            <div>
                <Getintouchform></Getintouchform>
            </div>

            {/* section6 */}
            <div className="mt-7">
                <Footer></Footer>
            </div>
            
        </div>
    )
}

export default Aboutus;