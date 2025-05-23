import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDb from "./db/index.js";

const PORT = process.env.PORT || 8001;
console.log("MongoDB URL:", process.env.MONGODB_URL);

connectDb()
  .then(() => {
      app.listen(PORT, () => {
          console.log(`Server is running on ${PORT}`);
      });
  })
  .catch((err) => {
      console.log("Mongo DB connection error", err);
  });
