import Contactform from "./Contactform";

function Getintouchform(){
    return (
        <div className="w-10/12 mx-auto flex flex-col  mt-32 items-center text-white">
            <h1 className=" font-semibold font-inter text-3xl ">Get in Touch</h1>
            <p className="text-sm text-richblack-300 mt-2 mb-8">We’d love to here for you, Please fill out this form.</p>
            <Contactform></Contactform>
        </div>
    )
}

export default Getintouchform;