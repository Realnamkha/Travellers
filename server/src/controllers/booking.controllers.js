import { asyncHandler } from "../utils/asyncHandler.js";
import { Booking } from "../models/bookings.models.js";
import { User } from "../models/users.models.js";
import { Room } from "../models/rooms.models.js";
import { ApiResponse } from "../utils/apiResponse.js";

const createBooking = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const room = req.params.id;
  const { checkInDate, checkOutDate, guests } = req.body;

  if (!user || !room || !checkInDate || !checkOutDate || !guests) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "All fields are required"));
  }

  // Check if user exists
  const existingUser = await User.findById(user);
  if (!existingUser) {
    return res.status(404).json(new ApiResponse(404, {}, "User not found"));
  }

  // Check if room exists
  const existingRoom = await Room.findById(room);
  if (!existingRoom) {
    return res.status(404).json(new ApiResponse(404, {}, "Room not found"));
  }

  // Validate dates
  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);
  if (checkIn >= checkOut) {
    return res
      .status(400)
      .json(
        new ApiResponse(400, {}, "Check-out date must be after check-in date")
      );
  }
  if (checkIn < new Date()) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Check-in date cannot be in the past"));
  }

  // Validate guests count
  if (guests <= 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Guests must be at least 1"));
  }

  // Check room availability
  const overlappingBooking = await Booking.findOne({
    room,
    status: { $in: ["Pending", "Confirmed"] },
    $or: [{ checkInDate: { $lt: checkOut }, checkOutDate: { $gt: checkIn } }],
  });

  if (overlappingBooking) {
    return res
      .status(409)
      .json(
        new ApiResponse(
          409,
          {},
          "Room is already booked for the selected dates"
        )
      );
  }

  const booking = new Booking({
    user,
    room,
    checkInDate: checkIn,
    checkOutDate: checkOut,
    guests,
  });

  await booking.save();

  return res
    .status(201)
    .json(new ApiResponse(201, booking, "Booking created successfully"));
});

const confirmBooking = asyncHandler(async (req, res) => {
  const bookingId = req.params.bookingId;

  const booking = await Booking.findById(bookingId);
  if (!booking) {
    return res.status(404).json(new ApiResponse(404, {}, "Booking not found"));
  }

  if (booking.status === "Confirmed") {
    return res
      .status(400)
      .json(new ApiResponse(400, {}, "Booking is already confirmed"));
  }

  booking.status = "Confirmed";
  await booking.save();

  return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking confirmed successfully"));
});

export { createBooking, confirmBooking };
