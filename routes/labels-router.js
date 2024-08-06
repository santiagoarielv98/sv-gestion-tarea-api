import { Router } from "express";
import verifyToken from "../middleware/index.js";

import labelsController from "../controllers/labels-controller.js";

const router = Router();

router.get("/", verifyToken, labelsController.getLabels);
router.get("/:id", verifyToken, labelsController.getLabel);
router.post("/", verifyToken, labelsController.createOrUpdateLabel);
router.put("/:id", verifyToken, labelsController.createOrUpdateLabel);
router.delete("/:id", verifyToken, labelsController.deleteLabel);
router.patch("/activate/:id", verifyToken, labelsController.activateLabel);

export default router;
