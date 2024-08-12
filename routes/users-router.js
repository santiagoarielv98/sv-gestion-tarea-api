import { Router } from "express";

import * as userController from "../controllers/user-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();

router.post("/signup", userController.registerUser);
router.post("/signin", userController.authenticateUser);
router.post("/signout", userController.logoutUser);
router.get("/check", verifyToken, userController.checkAuth);

export default router;
