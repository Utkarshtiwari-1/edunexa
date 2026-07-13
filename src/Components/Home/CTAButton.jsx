import { Link } from "react-router-dom";

function CTAButton({children,active,linkto}){
    return (

        <Link to={linkto}>
             <div className={`text-center max-w-maxContent  flex flex-row gap-2 items-center text-[13px] px-6 py-3 rounded-md font-bold ${active?"bg-yellow-50 text-black " :"bg-richblack-200"}
              transition-all duration-200 hover:scale-95  border-r-[3px] border-b-[3px] ${active?" border-yellow-5 " :" border-richblack-5"}`}>
                {children}
            </div>
        </Link>
       
    )
}

export default CTAButton;