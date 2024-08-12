import { Router } from "express";

import * as userController from "../controllers/user-controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para operaciones de usuario.
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: ID del usuario.
 *         email:
 *           type: string
 *           description: Email del usuario.
 *       required:
 *         - _id
 *         - email
 */

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Registra un nuevo usuario.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario.
 *                 email:
 *                   type: string
 *                   description: Email del usuario.
 *       400:
 *         description: Error al registrar el usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post("/signup", userController.validateUser, userController.registerUser);
/**
 * @swagger
 * /api/users/signin:
 *   post:
 *     summary: Autentica a un usuario.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Usuario autenticado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario.
 *                 email:
 *                   type: string
 *                   description: Email del usuario.
 *       400:
 *         description: Error en la autenticación del usuario.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post("/signin", userController.validateUser, userController.authenticateUser);
/**
 * @swagger
 * /api/users/signout:
 *   post:
 *     summary: Cierra la sesión del usuario.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       400:
 *         description: Error al cerrar sesión.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.post("/signout", userController.logoutUser);
/**
 * @swagger
 * /api/users/check:
 *   get:
 *     summary: Verifica la autenticación del usuario.
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del usuario.
 *                 email:
 *                   type: string
 *                   description: Email del usuario.
 *       404:
 *         description: Usuario no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 *       400:
 *         description: Error al verificar la autenticación.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error.
 */
router.get("/check", verifyToken, userController.checkAuth);

export default router;
