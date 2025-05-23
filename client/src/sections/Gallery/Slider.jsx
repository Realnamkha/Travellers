import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const images = ["./1.jpg", "./11.jpg", "./12.jpg", "./6.jpg", "./5.jpg"];
const Slider = () => {
  return (
    <div className="mt-24 flex justify-center items-center px-6 py-12 bg-gray-50 mb-28">
      <Carousel
        className="w-full max-w-4xl"
        orientation="vertical | horizontal"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 px-2"
            >
              <div className="overflow-hidden rounded-lg shadow-md">
                <img
                  src={src}
                  alt={`Gallery ${index + 1}`}
                  className="w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Slider;
