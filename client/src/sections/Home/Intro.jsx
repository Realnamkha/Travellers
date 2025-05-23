import React from "react";
import { Button } from "@/components/ui/button";

const Intro = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-3 py-12 max-w-7xl mx-auto">
      <div className="md:col-span-1">
        <img
          src="./flag.jpeg"
          alt="Guest House"
          className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md"
        />
      </div>
      <div className="md:col-span-2 space-y-4 text-center md:text-left">
        <h2 className="text-3xl font-bold text-gray-800">NAMASTE</h2>
        <h2 className="text-xl font-bold text-gray-800">
          Welcome to Travellers Guest House
        </h2>
        <p className="text-gray-600 text-justify text-lg leading-relaxed">
          At Travellers Guest House, nestled in the heart of Nepal's trekking
          paradise, we offer more than just a place to stay — we offer a
          starting point for adventure. Whether you’re heading to the Himalayas
          or returning from a life-changing trek, our cozy, welcoming guest
          house is your home away from home. Embrace the warmth of Nepali
          hospitality, relax in our peaceful surroundings, and connect with
          fellow adventurers from around the world. Your journey begins — or
          continues — with us.
        </p>
      </div>
    </div>
  );
};

export default Intro;
