import { Router } from "express";
import verifyToken from "../middleware/index.js";

import tasksController from "../controllers/tasks-controller.js";

const router = Router();

router.get("/", verifyToken, tasksController.getTasks);
router.get("/:id", verifyToken, tasksController.getTask);
router.post("/", verifyToken, tasksController.createOrUpdateTask);
router.put("/:id", verifyToken, tasksController.createOrUpdateTask);
router.delete("/:id", verifyToken, tasksController.deleteTask);
router.patch("/:id", verifyToken, tasksController.toggleTask);
router.patch("/activate/:id", verifyToken, tasksController.activateTask);

export default router;
