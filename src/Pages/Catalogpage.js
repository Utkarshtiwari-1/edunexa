import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCatalogdata } from "../service/operations";
import toast from "react-hot-toast";
import {categories} from "../service/apis";
import { apiconnector } from "../service/apiconnector";
import Footer from "../Components/common/Footer";
import Courseslider from "../Components/catalogcourse/Courseslider";
import Course_card from "../Components/catalogcourse/Course_card";
 
function Catalogpage()
{

    const {categoryid} = useParams();
    
    console.log("IDD",categoryid);
    const [id,setid] = useState(categoryid);
    const [catalogpagedata,setcatalogpagedata] = useState({});
    const [sublinks,setsublinks] = useState([]);
    const [categoryname,setcategoryname] = useState(null);
    const [loading,setLoading] = useState(true);

    console.log("category id",categoryid);
    async function getcatalogpagedata()
    {
        setLoading(true);
        const result = await getCatalogdata(categoryid);
        if(result)
        {
            setcatalogpagedata(result);
            
        }
        else
        {
            toast.error("Failed to fetch catalogdata");
        }
        setLoading(false);
    }

    async function getsublinks(){
       setLoading(true);
        try {

            const result = await  apiconnector("get",categories.CATEGORIES_API);
            console.log("api",categories.CATEGORIES_API);
            console.log("call gye");
            console.log(result.data.data);
            setsublinks(result.data.data);
            const links = result.data.data.filter((link)=>link._id===id);
            setcategoryname(links[0]);
           
        } catch (error) {
            console.log(error);
        }
       setLoading(false);
    }
    useEffect(()=>{
        getsublinks();

        getcatalogpagedata();
        
        //setcategoryname(links[0]);
        
    },[categoryid])

    console.log(sublinks,"sublinks");
        
    console.log("Links",categoryname);
    
    
    

  


     return(
        <div >
        {
            loading===true?(<div className="text-white">Loading...</div>)
            :(
                <div className="w-full bg-richblack-700">
                        <div className="w-10/12 mx-auto pt-10 pb-10">
                        <div className="flex gap-1 text-white text-sm">
                            <p className="text-richblack-400">Home  /</p>
                            <p className="text-richblack-400">Catalog  /</p>
                            <p className="text-yellow-50">{" "}{categoryname.name}</p>
                        </div>
                        <div className="text-3xl text-white font-semibold font-inter mt-5">{categoryname.name}</div>
                        <div className="text-richblack-300 text-sm">{categoryname.description}</div>
                        
                    </div>
                    <div className="bg-richblack-900 w-full">
                        <div className="w-10/12 mx-auto pt-10">
                            <div className="text-2xl font-semibold font-inter text-white pb-3">Courses to get you started</div>
                            <div className="flex gap-5 text-richblack-100">
                                <p>Most Popular</p>
                                <p>New</p>
                            </div>
                            <div className="h-[1px] bg-richblack-300 mt-3"></div>
                            <Courseslider courses={catalogpagedata.mycategory}></Courseslider>
                        </div>
                        <div className="w-10/12 mx-auto pt-10">
                            <div className="text-2xl font-semibold font-inter text-white pb-3">Top Course</div>
                            <Courseslider courses={catalogpagedata.diffrentcourses}></Courseslider>
                        </div>
                        <div className="w-10/12 mx-auto pt-10 pb-20">
                            <div className="text-2xl font-semibold font-inter text-white pb-3">Frequently Bought Together</div>
                            <div className="grid grid-cols-1 lg:grid-cols-2">
                                {
                                    catalogpagedata?.mostSellingCourses?.map((course)=>(
                                        <Course_card key={course._id} course={course} Height="h-[300px]" Width="w-[500px]"></Course_card>
                                    ))
                                }
                            </div>
                        </div>
                        

                    </div>

                </div>

            )
        }
        <Footer></Footer>
            
        </div>
    )
}

export default Catalogpage;