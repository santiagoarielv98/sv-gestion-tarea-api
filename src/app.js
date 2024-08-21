import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import logger from "morgan";

import authRoutes from "./routes/authRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
});

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env?.ALLOWED_ORIGIN?.split(",") ?? "*", credentials: true }));
app.use(helmet());
app.use(limiter);

app.use("/api/auth", authRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/tasks", taskRoutes);

/* connectDB().then(async () => {
  await seed();
  console.log("Database connected");
});
 */
export default app;
