import { Router } from "express";
import verifyToken from "../middleware/index.js";

import * as tasksController from "../controllers/tasks-controller.js";

const router = Router();

router.get("/", verifyToken, tasksController.getTasks);

export default router;
