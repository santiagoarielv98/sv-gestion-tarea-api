import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import express, { json, urlencoded } from "express";
import logger from "morgan";

const app = express();

app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: process.env?.ALLOWED_ORIGIN?.split(",") ?? "*" }));
app.use(helmet());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Limita cada IP a 100 solicitudes por ventana
  })
);

export default app;
