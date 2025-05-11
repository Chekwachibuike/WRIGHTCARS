import { Router } from "express";
import createHelpRequestHandler from "./create";
import updateHelpRequestHandler from "./update";
import assignWorkerHandler from "./assign";
import validate from "../../../middleware/validate";
import authorizedRoles from "../../../middleware/role";
import { createHelpRequestSchema, updateHelpRequestSchema, helpRequestIdSchema } from "../../../validationSchema/helpRequest";
import authenticateUser from "../../../middleware/authenticateUser";
import deserializeUser from "../../../middleware/deserializeUser";

const helpRequestRoutes = Router();

// Apply authentication middleware to all routes
helpRequestRoutes.use(deserializeUser);
helpRequestRoutes.use(authenticateUser);

/**
 * @swagger
 * components:
 *   schemas:
 *     HelpRequest:
 *       type: object
 *       required:
 *         - userId
 *         - description
 *         - location
 *       properties:
 *         userId:
 *           type: string
 *           description: ID of the user creating the help request
 *         workerId:
 *           type: string
 *           description: ID of the worker assigned to the request
 *         description:
 *           type: string
 *           description: Description of the help needed
 *         location:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         status:
 *           type: string
 *           enum: [pending, accepted, in_progress, completed, cancelled]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the request was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp when the request was last updated
 *     ApiResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: object
 *           nullable: true
 *         message:
 *           type: string
 *           nullable: true
 *         statusCode:
 *           type: number
 *         errorCode:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * /api/v1/help-requests:
 *   post:
 *     summary: Create a new help request
 *     description: Create a new help request for car servicing
 *     tags:
 *       - Help Requests
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HelpRequest'
 *     responses:
 *       201:
 *         description: Help request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       400:
 *         description: Invalid request data
 *       401:
 *         description: Unauthorized - User not authenticated
 *       500:
 *         description: Internal server error
 */
helpRequestRoutes.post("/", validate(createHelpRequestSchema), createHelpRequestHandler);

/**
 * @swagger
 * /api/v1/help-requests/{id}:
 *   put:
 *     summary: Update a help request
 *     description: Update an existing help request. Only the creator or assigned worker can update it.
 *     tags:
 *       - Help Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the help request to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HelpRequest'
 *     responses:
 *       200:
 *         description: Help request updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Help request not found
 *       403:
 *         description: Unauthorized to update this help request
 *       500:
 *         description: Internal server error
 */
helpRequestRoutes.put("/:id", validate(helpRequestIdSchema), validate(updateHelpRequestSchema), updateHelpRequestHandler);

/**
 * @swagger
 * /api/v1/help-requests/{id}/assign:
 *   post:
 *     summary: Assign a worker to a help request
 *     description: Assign a worker to a pending help request. Only workers can assign themselves.
 *     tags:
 *       - Help Requests
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the help request to assign
 *     responses:
 *       200:
 *         description: Worker assigned successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: Help request not found
 *       403:
 *         description: Only workers can assign themselves to help requests
 *       500:
 *         description: Internal server error
 */
helpRequestRoutes.post("/:id/assign", validate(helpRequestIdSchema), authorizedRoles('worker'), assignWorkerHandler);

export default helpRequestRoutes; 