import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/authorization.middlewares.js";
import { createBooking } from "../controllers/booking.controllers.js";

const router = Router();

// Unsecured routes

// Secured routes
router.route("/book-room/:id").post(verifyJWT, createBooking);

export default router;
