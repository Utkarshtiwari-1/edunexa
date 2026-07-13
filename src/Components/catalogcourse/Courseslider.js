import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';



// import required modules
import { Pagination } from 'swiper/modules';
import Course_card from './Course_card';

 function Courseslider({courses}) {

  console.log(courses);
  return (
    <>
      <Swiper
        slidesPerView={3}
        spaceBetween={25}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        
      >
        {
           courses &&  courses.map((course)=>(
                <SwiperSlide key={course._id}>
                   <Course_card course={course} Height="h-[200px]" Width="w-[300px]"></Course_card>
                </SwiperSlide>
                
            ))
        }
      </Swiper>
    </>
  );
}


export default Courseslider;