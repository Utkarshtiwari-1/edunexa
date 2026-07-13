import Logo1 from "../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg";


const data = [
    {
        logo:Logo1,
        title:"Leadership",
        description:"Fully committed to the sucsess company"
    },
    {
        logo:Logo2,
        title:"Leadership",
        description:"Fully committed to the sucsess company"
    },
    {
        logo:Logo3,
        title:"Leadership",
        description:"Fully committed to the sucsess company"
    },
    {
        logo:Logo4,
        title:"Leadership",
        description:"Fully committed to the sucsess company"
    }
]


function LineData(){

    return(
        <div className="relative">
            
        <div className="flex flex-col gap-8  z-20 h-[400px]">
            {
                data.map((element,index)=>{
                    return(
                        <div className="flex gap-5 items-center" key={index}>
                            <div className="h-[40px] z-10 w-[40px] rounded-full bg-richblack-300 flex justify-center items-center">
                                <img src={element.logo}></img>
                            </div>
                            <div className="flex flex-col">
                                <div>{element.title}</div>
                                <div className=" text-richblack-300 text-sm">{element.description}</div>
                            </div>
                        </div>

                    )
                })
            }
        </div>
        <div className=" absolute w-[1px] h-[200px] z-1 bg-richblack-100 border-l border-dashed left-[18px]
        bottom-[41%] "></div>
        </div>
        
    )
}

export default LineData;