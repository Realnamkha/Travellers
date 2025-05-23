import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    roomType: {
      type: String,
      enum: ["Single", "Double"],
      required: true,
    },
    isAvailable: { type: Boolean, default: true },
    attachedToilet: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
