import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";

import * as tasksController from "../controllers/tasks-controller.js";
import { handlerValidationSchema, validateIdParamHandler } from "../helpers/handlerValidation.js";
import { taskValidator } from "../validators/task-validator.js";

const router = Router();

router.get("/", verifyToken, tasksController.getTasks);
router.get("/:id", verifyToken, validateIdParamHandler(), tasksController.getTask);
router.post("/", verifyToken, handlerValidationSchema(taskValidator), tasksController.createTask);
router.put(
  "/:id",
  verifyToken,
  validateIdParamHandler(),
  handlerValidationSchema(taskValidator),
  tasksController.updateTask
);
router.delete("/:id", verifyToken, validateIdParamHandler(), tasksController.deleteTask);
router.put("/activate/:id", verifyToken, validateIdParamHandler(), tasksController.activateTask);
export default router;
