import { useEffect, useState } from "react";
import { ratingsEndpoints } from "../../service/apis";
import { apiconnector } from "../../service/apiconnector";
import toast from "react-hot-toast";

import {Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination,Autoplay } from 'swiper/modules';
import Ratingcard from "./Ratingcard";

function RatingandReviewslider()
{
    const {REVIEWS_DETAILS_API} = ratingsEndpoints;
    const [ratings,setratings] = useState([]);
    const [loading,setloading] = useState(false);

    useEffect(()=>{

        const getallratings = async()=>{
            setloading(true);

            try {

                const result  = await apiconnector("GET",REVIEWS_DETAILS_API);
                if(!result.data.sucsess)
                {
                    throw new Error(result.data.message);
                }

                setratings(result.data.data);
                
            } catch (error) {
                console.log(error,"in ratings");
                toast.error("Issue while fetching rating");
            }
            

        }
        getallratings();

    },[])

    return (
        <>
        {
            ratings.length===0 ?(<p>No ratings Given yet</p>):(
              
                    <Swiper
                    slidesPerView={4}
                    spaceBetween={10}
                    pagination={{
                    clickable: true,
                    }}
                    autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    }}
                    loop={true}
                    
                    modules={[Pagination,Autoplay]}>
                    {
                        ratings.map((rating,index)=>(
                            <SwiperSlide key={index}>
                                <Ratingcard rating={rating} Height="h-[200px]" Width="w-[270px]"></Ratingcard>
                            </SwiperSlide>
                        ))
                    }
                       
                    </Swiper>
                
            )
        }

        </>
    )
}

export default RatingandReviewslider;