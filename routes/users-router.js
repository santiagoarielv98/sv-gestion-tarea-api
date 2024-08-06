import { Router } from "express";

import userController from "../controllers/user-controller.js";

const router = Router();

router.post("/signup", userController.registerUser);
router.post("/signin", userController.authenticateUser);
router.post("/signout", userController.logoutUser);

export default router;
