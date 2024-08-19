import { Router } from "express";
import * as tagController from "../controllers/tagController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { createTagSchema, updateTagSchema } from "../utils/validationSchemas.js";

const router = Router();

router.post("/", verifyToken, validationMiddleware(createTagSchema), tagController.createTag);
router.get("/", verifyToken, tagController.getTags);
router.get("/:tagId", verifyToken, tagController.getTagById);
router.put("/:tagId", verifyToken, validationMiddleware(updateTagSchema), tagController.updateTag);
router.delete("/:tagId", verifyToken, tagController.deleteTag);
router.patch("/:tagId/activate", verifyToken, tagController.activateTag);
