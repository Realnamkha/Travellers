import React, { useEffect, useState } from "react";
import axios from "axios";

const Room = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/rooms");
        setRooms(res.data.data);
      } catch (error) {
        console.error("Failed to fetch rooms", error);
      }
    };
    fetchRooms();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Rooms and Suites</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {rooms.map((room, idx) => (
          <div
            key={idx}
            className="relative rounded shadow text-center overflow-hidden cursor-pointer"
          >
            <img
              src={"./hotel.jpeg"} // make sure your API includes image URL
              alt={room.name}
              className="w-full h-96 md:h-[30rem] object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-30 backdrop-blur-md text-black p-3 rounded-b-lg text-left">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-sm">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
