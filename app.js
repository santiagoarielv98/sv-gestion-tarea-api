import cookieParser from "cookie-parser";
import cors from "cors";
import express, { json, urlencoded } from "express";
import logger from "morgan";
import { specs } from "./swagger.js";

import router from "./routes/index.js";
import swaggerUiExpress from "swagger-ui-express";
const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env.ALLOWED_ORIGIN.split(","), credentials: true }));
app.use("/", router);
app.use("/api-docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

export default app;
