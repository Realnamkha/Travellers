import { Room } from "../models/rooms.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createRoom = asyncHandler(async (req, res) => {
  const { name, description, price, roomType, attachedToilet } = req.body;
  if (!name || !price || !roomType) {
    throw new ApiError(400, "Name, Price, and Room Type are required");
  }
  try {
    const room = await Room.create({
      name,
      description,
      price,
      roomType,
      attachedToilet,
    });
    const createdRoom = await Room.findById(room._id);
    if (!createdRoom) {
      throw new ApiError(500, "Something went wrong while creating room");
    }
    return res
      .status(201)
      .json(new ApiResponse(200, createdRoom, "Room created successfully"));
  } catch (error) {
    console.error("Room creation failed", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
});

const getAllRooms = asyncHandler(async (req, res) => {
  const rooms = await Room.find();
  return res
    .status(200)
    .json(new ApiResponse(200, rooms, "Rooms fetched successfully"));
});

const getRoomById = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, room, "Room fetched successfully"));
});

const updateRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.id;
  const updates = req.body;
  const updatedRoom = await Room.findByIdAndUpdate(roomId, updates, {
    new: true,
    runValidators: true,
  });
  if (!updatedRoom) {
    return res.status(404).json({ message: "Room not found" });
  }

  res.status(200).json({
    success: true,
    data: updatedRoom,
    message: "Room updated successfully",
  });
});

const deleteRoom = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  await Room.findByIdAndDelete(id);

  res.status(200).json({ message: "Room deleted successfully" });
});

const toggleRoomAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);
  if (!room) {
    return res.status(404).json({ message: "Room not found" });
  }

  room.isAvailable = !room.isAvailable; // toggle boolean
  await room.save();

  res.status(200).json({
    message: `Room availability toggled to ${room.isAvailable}`,
    data: room,
  });
});

export {
  createRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  toggleRoomAvailability,
};
