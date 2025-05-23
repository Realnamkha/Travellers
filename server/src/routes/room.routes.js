import { Router } from "express";
import {
  createRoom,
  deleteRoom,
  getAllRooms,
  getRoomById,
  updateRoom,
} from "../controllers/room.controllers.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/authorization.middlewares.js";

const router = Router();

// Unsecured routes
router.route("/").get(getAllRooms);
router.route("/get-room/:id").get(getRoomById);

// Secured routes
router.route("/create-room").post(verifyJWT, verifyAdmin, createRoom);
router.route("/update-room/:id").put(verifyJWT, verifyAdmin, updateRoom);
router.route("/delete-room/:id").delete(verifyJWT, verifyAdmin, deleteRoom);

export default router;
