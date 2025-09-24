"use client";
import React from "react";
import Img1 from "../../../../public/images/slider-image-1.jpeg";
import Img2 from "../../../../public/images/slider-image-2.jpeg";
import Img3 from "../../../../public/images/slider-image-3.jpeg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";

export default function MainSlider() {
  return (
  <div className=" w-[90%] mx-auto my-4 flex flex-col md:flex-row">
    
    <div className="left w-full md:w-3/4">
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
      >
        <SwiperSlide>
          <Image
            src={Img1}
            alt="image_1"
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img2}
            alt="image_2"
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
        </SwiperSlide>
        <SwiperSlide>
          <Image
            src={Img3}
            alt="image_3"
            className="w-full h-[250px] md:h-[400px] object-cover"
          />
        </SwiperSlide>
      </Swiper>
    </div>
    <div className="right w-full md:w-1/4 flex md:flex-col">
      <Image
        src={Img2}
        alt="image_2"
        className="w-1/2 md:w-full object-cover h-[150px] md:h-[200px]"
      />
      <Image
        src={Img3}
        alt="image_3"
        className="w-1/2 md:w-full object-cover h-[150px] md:h-[200px]"
      />
    </div>
  </div>
);

}
