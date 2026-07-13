import Contactform from "../Components/common/Contactform";
import Footer from "../Components/common/Footer";
import RatingandReviewslider from "../Components/common/RatingandReviewslider";

function Contactuspage(){
    return(
        <div>
            <div className="flex lg:flex-row sm:flex-col gap-20 w-10/12 pb-6 mx-auto justify-center mt-20">
                <div className="w-[40%] flex flex-col text-white pl-14 bg-richblack-500 h-[300px]
                 items-start justify-center rounded-md border border-richblack-100 gap-y-4">
                <div>
                    <h1>Chat on us</h1>
                    <p className="text-sm text-richblack-100">our friendly team is here to help</p>
                    <p className="text-sm text-richblack-100">@mail address</p>
                </div>
                <div>
                    <h1>Visit us</h1>
                    <p className="text-sm text-richblack-100">Come and say hello at our office HQ.</p>
                    <p className="text-sm text-richblack-100">Here is the location/ address</p>
                </div>
                <div>
                    <h1>Call us</h1>
                    <p className="text-sm text-richblack-100">Mon - Fri From 8am to 5pm</p>
                    <p className="text-sm text-richblack-100">+123 456 7890</p>
                </div>

                </div>
                <div className="lg:w-[50%] sm:w-[90%] border border-richblack-200 rounded-md p-10">
                    <div className="text-3xl text-white  pb-3">Got a Idea? We’ve got the skills. Let’s team up</div>
                    <div className="text-richblack-300 pb-5">Tall us more about yourself and what you’re got in mind.</div>
                    <Contactform></Contactform>
                </div>

            </div>
            <div className="w-10/12 pt-4 pb-8 mx-auto"> 
            <RatingandReviewslider></RatingandReviewslider>

            </div>
            <div>
                <Footer></Footer>
            </div>
        </div>
    )
}

export default Contactuspage;