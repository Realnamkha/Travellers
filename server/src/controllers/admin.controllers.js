import { User } from "../models/users.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const promoteToAdmin = asyncHandler(async (req, res) => {
  if (!req.user?.isAdmin) {
    throw new ApiError(403, "Only admins can promote users to admin");
  }
  const { userId } = req.body;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const userToPromote = await User.findById(userId);
  if (!userToPromote) {
    throw new ApiError(404, "User not found");
  }
  if (userToPromote.isAdmin) {
    throw new ApiError(400, "User is already an admin");
  }
  userToPromote.isAdmin = true;
  await userToPromote.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        _id: userToPromote._id,
        name: userToPromote.name,
        email: userToPromote.email,
        isAdmin: userToPromote.isAdmin,
      },
      "User promoted to admin successfully"
    )
  );
});
export { promoteToAdmin };
