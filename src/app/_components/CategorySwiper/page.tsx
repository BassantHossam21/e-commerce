"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import { CategoryType } from "@/types/category.type";

export default function CategorySwiper({ data }: { data: CategoryType[] }) {
  return (
    <div className="w-[90%] mx-auto">
      <h1 className="text-slate-600 font-normal text-[20px] my-2">
        Shop Popular Categories
      </h1>
      <Swiper
        spaceBetween={15}
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        breakpoints={{
          320: { slidesPerView: 2, spaceBetween: 10 },
          640: { slidesPerView: 3, spaceBetween: 15 },
          1024: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {data.map((currentCategory:CategoryType) => (
          <SwiperSlide key={currentCategory._id}>
            <div className="relative w-full h-[120px] md:h-[150px]">
              <Image
                src={currentCategory.image}
                alt={currentCategory.name}
                fill
                sizes="(max-width: 768px) 50vw, 
            (max-width: 1024px) 33vw, 
            16vw"
                className="object-cover rounded-lg"
              />
            </div>

            <p className="text-center font-medium mt-2 text-sm truncate">
              {currentCategory.name}
            </p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
