// models/Review.js
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
