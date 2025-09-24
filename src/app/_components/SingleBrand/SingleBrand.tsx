"use client";

import React from "react";
import {
  Card,
  
} from "@/components/ui/card";
import { BrandType } from "@/types/brand.type";
import Image from "next/image";

export default function SingleBrand({
  brand,
  onClick,
}: {
  brand: BrandType;
  onClick: () => void;
}) {
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2">
      <Card
        onClick={onClick}
        className="cursor-pointer hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden p-0"
      >
        <div className="flex flex-col">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              sizes="(max-width: 640px) 100vw,
            (max-width: 768px) 50vw,
            (max-width: 1024px) 33vw,
            25vw"
              priority
              className="object-cover rounded-t-lg"
            />
          </div>

          <p className="text-center bg-gray-100 py-2 font-medium m-0 text-sm sm:text-base">
            {brand.name}
          </p>
        </div>
      </Card>
    </div>
  );
}
