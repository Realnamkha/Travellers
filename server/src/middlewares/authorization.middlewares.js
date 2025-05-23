import { ApiError } from "../utils/apiError.js";
export const verifyAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return next(new ApiError(403, "Access denied: Admins only"));
  }
  next();
};
