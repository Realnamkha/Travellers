import { User } from "../models/users.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  console.log("Verify JWT");
  try {
    const authHeader = req.header("Authorization");
    console.log("Type of authHeader:", typeof authHeader);
    console.log("authHeader value:", authHeader);

    const token =
      req.cookies?.accessToken ||
      (typeof authHeader === "string"
        ? authHeader.replace(/^Bearer\s+/i, "")
        : "");

    console.log("Token retrieved:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
