import { Router } from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import * as authController from "../controllers/authController.js";

const router = Router();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", verifyToken, authController.signOut);
router.get("/check", verifyToken, authController.check);
