import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";

import * as labelsController from "../controllers/labels-controller.js";
import { handlerValidationSchema, validateIdParamHandler } from "../helpers/handlerValidation.js";
import { labelValidator } from "../validators/label-validator.js";

const router = Router();

router.get("/", verifyToken, labelsController.getLabels);
router.get("/:id", verifyToken, validateIdParamHandler(), labelsController.getLabel);
router.post("/", verifyToken, handlerValidationSchema(labelValidator), labelsController.createLabel);
router.put(
  "/:id",
  verifyToken,
  validateIdParamHandler(),
  handlerValidationSchema(labelValidator),
  labelsController.updateLabel
);
router.delete("/:id", verifyToken, validateIdParamHandler(), labelsController.deleteLabel);
router.put("/activate/:id", verifyToken, validateIdParamHandler(), labelsController.activateLabel);

export default router;
