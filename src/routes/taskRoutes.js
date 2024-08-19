import { Router } from "express";
import * as taskController from "../controllers/taskController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { createTaskSchema, updateTaskSchema } from "../utils/validationSchemas";

const router = Router();

router.post("/", verifyToken, validationMiddleware(createTaskSchema), taskController.createTask);
router.get("/", verifyToken, taskController.getTasks);
router.get("/:taskId", verifyToken, taskController.getTaskById);
router.put("/:taskId", verifyToken, validationMiddleware(updateTaskSchema), taskController.updateTask);
router.delete("/:taskId", verifyToken, taskController.deleteTask);
router.patch("/:taskId/activate", verifyToken, taskController.activateTask);
router.patch("/:taskId/toggle", verifyToken, taskController.toggleTask);

export default router;
