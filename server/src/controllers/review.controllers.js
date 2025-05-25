import { Review } from "../models/reviews.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const postReview = asyncHandler(async (req, res) => {
  const { name, comment, rating } = req.body;
  if (!name || !comment || !rating) {
    throw new ApiError(400, "All fields are required"); // 400 is better for bad request
  }
  try {
    const review = new Review({ name, comment, rating });
    await review.save();
    return res
      .status(201)
      .json(new ApiResponse(201, review, "Review registered successfully"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong");
  }
});

const getReview = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).limit(3);
    return res
      .status(200)
      .json(
        new ApiResponse(200, reviews, "Latest 3 reviews fetched successfully")
      );
  } catch (error) {
    throw new ApiError(500, "Something went wrong while fetching reviews");
  }
});

export { postReview, getReview };
