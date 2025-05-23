import express from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/authorization.middlewares.js";
import { promoteToAdmin } from "../controllers/admin.controllers.js";
import { confirmBooking } from "../controllers/booking.controllers.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controllers.js";

const router = express.Router();

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.patch("/promote/:userId", verifyJWT, verifyAdmin, promoteToAdmin);
router.patch(
  "/confirm-booking/:bookingId",
  verifyJWT,
  verifyAdmin,
  confirmBooking
);

export default router;
