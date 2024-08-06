import cookieParser from "cookie-parser";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import cors from "cors";

import router from "./routes/index.js";
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN }));

app.use("/", router);

export default app;
