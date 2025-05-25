import express from "express";
import { handleContact } from "../controllers/contact.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/contact", verifyJWT, handleContact);

export default router;
