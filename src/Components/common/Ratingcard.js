import ReactStars from "./RatingStars";


function Ratingcard({rating,Height,Width}){
    return(
        <div className={` bg-richblack-800 p-4 rounded-sm ${Width} text-white`}>
            <div className="flex gap-3">
                <img src={rating?.user?.image} className="h-[50px] w-[50px] aspect-square rounded-full"></img>
                <div>
                    <p className="text-sm ">{rating?.user?.FirstName}</p>
                    <p className="text-sm text-richblack-400">{rating?.user?.email}</p>
                </div>
            </div>
            <div className="pt-2 pb-2 font-inter">{rating?.review}</div>
            <div className="flex gap-3">
                <p className="text-yellow-50">{rating?.rating}</p>
                <ReactStars Review_Count={rating?.rating}></ReactStars>
            </div>
        </div>
    )
}

export default Ratingcard;