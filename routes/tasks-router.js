import { Router } from "express";
import verifyToken from "../middleware/index.js";

import tasksController from "../controllers/tasks-controller.js";

const router = Router();


export default router;
