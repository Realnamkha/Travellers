import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173" || process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public")); // configure css and static pictures
app.use(cookieParser());

//import routes
import heathcheckrouter from "./routes/healthcheck.routes.js";
import userRouter from "./routes/user.routes.js";
import roomRouter from "./routes/room.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

//routes
app.use("/api/v1/healthcheck", heathcheckrouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/rooms", roomRouter);
app.use("/api/v1/bookings", bookingRoutes);

export { app };
