import React from "react";

const Room = () => {
  const rooms = [
    {
      img: "./room1.jpg",
      title: "Deluxe Room",
      description: "A cozy room with mountain views.",
    },
    {
      img: "./room2.jpg",
      title: "Superior Room",
      description: "Spacious room with city views.",
    },
    {
      img: "./room3.jpg",
      title: "Suite",
      description: "Luxurious suite with private balcony.",
    },
  ];

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
              src={room.img}
              alt={room.title}
              className="w-full h-96 md:h-[30rem] object-cover rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-30 backdrop-blur-md text-black p-3 rounded-b-lg text-left">
              <h2 className="text-xl font-semibold">{room.title}</h2>
              <p className="text-sm">{room.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
