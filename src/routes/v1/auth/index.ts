import { Router } from "express";
import loginHandler from "./login";
import validate from "../../../middleware/validate";
import { loginSchema } from "../../../validationSchema/user";

const authRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - emailAddress
 *         - phoneNumber
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: User's full name
 *         emailAddress:
 *           type: string
 *           format: email
 *           description: User's email address
 *         phoneNumber:
 *            type: string
 *            description: User's number
 *         password:
 *            type: string
 *            description: User's password
 *     ApiResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           nullable: true
 *         message:
 *           type: string
 *           nullable: true
 *
 * /api/v1/auth/login:
 *   post:
 *     summary: Login User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - emailAddress
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *               emailAddress:
 *                 type: string
 *                 format: email
 *     responses:
 *       201:
 *         description: success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: null
 */
authRoutes.post("/login", validate(loginSchema), loginHandler);

export default authRoutes;
