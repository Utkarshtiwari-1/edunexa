
import { Link } from "react-router-dom";

function Course_card({course,Height,Width}){
    return(
        <Link to={`/courses/${course._id}`}>
                <div className="flex flex-col mt-7">
            <div className={`${Height}`}>
                <img src={course?.thumbnail} alt="Course image" className={`${Height} ${Width} rounded-md aspect-auto object-fill`}></img>
            </div>
            <div className="flex flex-col text-white mt-4">
                <p className="font-semibold font-inter">{course.courseName}</p>
                <p className="text-sm text-richblack-200">{course?.instuctor?.FirstName} {course?.instuctor?.LastName}</p>
                <div>

                </div>
                <p className="text-xl font-semibold">₹{course.Price}</p>
            </div>
        </div>
        </Link>
        
    )
}

export default Course_card;