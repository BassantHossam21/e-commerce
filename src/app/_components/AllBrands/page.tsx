"use client";
import React, { useState, useEffect } from "react";
import getBrands from "@/api/brands.api";
import { BrandType } from "@/types/brand.type";
import SingleBrand from "../SingleBrand/SingleBrand";
import { Modal, ModalBody, ModalHeader, Button } from "flowbite-react";
import Image from "next/image";

export default function AllBrands() {
  const [brands, setBrands] = useState<BrandType[]>([]); //Array of Object [{}]
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null); //Object {}

  async function fetchBrands() {
    const data = await getBrands();
    setBrands(data);
  }

  useEffect(() => {
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto my-12 w-[90%]">
      <div className="flex flex-wrap">
        {brands.map((brand) => (
          <SingleBrand
            key={brand._id}
            brand={brand}
            onClick={() => setSelectedBrand(brand)}
          />
        ))}
      </div>

      {selectedBrand && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Modal
            show={true}
            size="lg"
            onClose={() => setSelectedBrand(null)}
            className="relative z-50 rounded-lg overflow-hidden p-0"
            popup
          >
            <ModalHeader />

            <ModalBody>
              <div className="flex flex-col items-start gap-2 px-6">
                <h1 className="text-6xl font-bold text-green-600">
                  {selectedBrand.name}
                </h1>

                <p className="text-gray-600 ms-1">{selectedBrand.slug}</p>

                <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden mt-4">
                  <Image
                    src={selectedBrand.image}
                    alt={selectedBrand.name}
                    fill
                    sizes="(max-width: 640px) 100vw,
                      (max-width: 768px) 50vw,
                      (max-width: 1024px) 33vw,
                      25vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* الزرار */}
              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setSelectedBrand(null)}
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-3 rounded-lg transition-all"
                >
                  Close
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      )}
    </div>
  );
}
