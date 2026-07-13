import Rendersteps from "../Components/Coursecreationcomonents/Rendersteps";

function Createcourse(){
    return(
        <div>
            <div className="text-2xl font-semibold font-inter text-pink-5">Create Course</div>
            <div className="flex gap-x-8 lg:flex-row sm:flex-col md:flex-col">
                <div className="min-w-[65%] ">
                    <Rendersteps></Rendersteps>
                </div>
                <div className="text-white bg-richblack-800 p-5 rounded-md border border-richblack-600
                h-[400px]">
                    <h1 className="text-xl font-semibold font-inter pb-3">⚡Course Upload Tips</h1>
                    <ul className="flex flex-col gap-y-1" >
                        <li  className="text-sm text-richblack-300">Set the Course Price option or make it free.</li>
                        <li  className="text-sm text-richblack-300">Standard size for the course thumbnail is 1024x576.</li>
                        <li  className="text-sm text-richblack-300">Video section controls the course overview video.</li>
                        <li  className="text-sm text-richblack-300">Course Builder is where you create & organize a course.</li>
                        <li className="text-sm text-richblack-300">Course Builder is where you create & organize a course.</li>
                        <li className="text-sm text-richblack-300">Information from the Additional Data section shows up on the course single page.</li>
                        <li className="text-sm text-richblack-300">Make Announcements to notify any important</li>
                        <li className="text-sm text-richblack-300">Notes to all enrolled students at once.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default  Createcourse;