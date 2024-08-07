import { Router } from "express";

import userRoutes from "./users-router.js";
import taskRoutes from "./tasks-router.js";
import labelsRoutes from "./labels-router.js";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/tasks", taskRoutes);
router.use("/api/labels", labelsRoutes);

export default router;
