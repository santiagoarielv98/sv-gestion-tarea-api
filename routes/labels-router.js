import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";

import labelsController from "../controllers/labels-controller.js";

const router = Router();

export default router;
