import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./src/routes/userRoutes.js";
import reviewRoutes from "./src/routes/reviewRoutes.js";
import menuRoutes from "./src/routes/menuRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Savory Review API running"));

app.use("/api/users", userRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/menu", menuRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/savory_db")
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(4000, () => console.log("🚀 Server running on port 4000"));
  })
  .catch((err) => console.error("MongoDB error:", err));
