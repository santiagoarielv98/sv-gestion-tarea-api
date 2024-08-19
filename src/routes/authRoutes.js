import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import validationMiddleware from "../middlewares/validationMiddleware.js";
import { loginSchema, registerSchema } from "../utils/validationSchemas.js";

const router = Router();

router.post("/signup", validationMiddleware(registerSchema), authController.signUp);
router.post("/signin", validationMiddleware(loginSchema), authController.signIn);
router.post("/signout", verifyToken, authController.signOut);
router.get("/check", verifyToken, authController.check);

export default router;
