import express from "express";
import { handleContact } from "../controllers/contact.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getReview, postReview } from "../controllers/review.controllers.js";

const router = express.Router();

router.post("/post-review", verifyJWT, postReview);
router.get("/get-review", verifyJWT, getReview);

export default router;
