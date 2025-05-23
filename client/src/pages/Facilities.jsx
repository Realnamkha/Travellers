import {
  FaWalking,
  FaShower,
  FaMountain,
  FaWifi,
  FaUtensils,
  FaMapSigns,
  FaFirstAid,
  FaFire,
  FaChargingStation,
} from "react-icons/fa";

const facilities = [
  { icon: <FaWalking />, label: "Experienced Local Guides Available" },
  { icon: <FaShower />, label: "Hot Shower Facilities" },
  { icon: <FaMountain />, label: "Panoramic Mountain Views" },
  { icon: <FaWifi />, label: "Free WiFi Connectivity" },
  { icon: <FaUtensils />, label: "Nutritious Multicuisine Meals" },
  { icon: <FaMapSigns />, label: "Trek Planning and Information Support" },
  { icon: <FaFirstAid />, label: "First Aid and Medical Assistance" },
  { icon: <FaFire />, label: "Comfortable Warm Rooms with Heating" },
  {
    icon: <FaChargingStation />,
    label: "Battery Charging Stations for Electronics",
  },
];
import React from "react";

const Facilities = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 max-h-screen mt-24">
      <h1 className="text-3xl font-bold mb-12 text-center text-black">
        Facilities at Our Trekking Hotel
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {facilities.map(({ icon, label }, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 p-4 bg-black/5 shadow rounded-lg hover:shadow-lg transition-shadow"
          >
            <div className="text-black text-4xl">{icon}</div>
            <div className="text-lg font-medium text-gray-800">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facilities;
