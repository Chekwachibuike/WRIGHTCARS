import { Router } from "express";
import enable2FAHandler from "./enable";
import verify2FAHandler from "./verify";
import verifyLoginOTPHandler from "./verify-login";
import validate from "../../../middleware/validate";
import { enable2FASchema, verify2FASchema, verifyLoginOTPSchema } from "../../../validationSchema/2fa";

const twoFARoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     TwoFA:
 *       type: object
 *       required:
 *         - emailAddress
 *       properties:
 *         emailAddress:
 *           type: string
 *           format: email
 *           description: User's email address
 *     TwoFAVerification:
 *       type: object
 *       required:
 *         - emailAddress
 *         - code
 *       properties:
 *         emailAddress:
 *           type: string
 *           format: email
 *           description: User's email address
 *         code:
 *           type: string
 *           description: 6-digit OTP code
 */

/**
 * @swagger
 * /api/v1/2fa/enable:
 *   post:
 *     summary: Enable 2FA for a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwoFA'
 *     responses:
 *       200:
 *         description: 2FA enabled successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
twoFARoutes.post("/enable", validate(enable2FASchema), enable2FAHandler);

/**
 * @swagger
 * /api/v1/2fa/verify:
 *   post:
 *     summary: Verify 2FA setup
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwoFAVerification'
 *     responses:
 *       200:
 *         description: 2FA verified successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
twoFARoutes.post("/verify", validate(verify2FASchema), verify2FAHandler);

/**
 * @swagger
 * /api/v1/2fa/verify-login:
 *   post:
 *     summary: Verify OTP during login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TwoFAVerification'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Invalid request
 *       500:
 *         description: Internal server error
 */
twoFARoutes.post("/verify-login", validate(verifyLoginOTPSchema), verifyLoginOTPHandler);

export default twoFARoutes; 