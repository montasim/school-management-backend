/**
 * @fileoverview Express router providing routine-related routes.
 *
 * This module defines routes for creating, retrieving, and deleting routines.
 * It includes middleware for authentication, file upload handling, and specific validations
 * related to routine operations. Each route is documented using Swagger annotations for API
 * specification and JSDoc comments for internal code documentation.
 *
 * @requires express Express - Express framework for building web applications
 * @requires authTokenMiddleware - Middleware for authenticating tokens
 * @requires fileUploadMiddleware - Middleware for handling file uploads
 * @requires RoutineValidationService - Service for validating routine-related parameters
 * @requires RoutineController - Controller for handling routine-related operations
 * @module routineRouter - Express router for routine routes
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { RoutineValidationService } from "./routine.validator.js";
import { RoutineController } from "./routine.controller.js";

const routineRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a routine.
 *     description: Endpoint to add a new routine to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: file
 *         type: file
 *         description: The file to upload.
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the routine.
 *     responses:
 *       200:
 *         description: Routine successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new routine.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
routineRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    RoutineController.createRoutineController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all routines.
 *     description: Endpoint to retrieve a list of all routines.
 *     responses:
 *       200:
 *         description: A list of routines.
 *       404:
 *         description: Routine not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all routines.
 * @route GET /
 */
routineRouter.get("/", [
    RoutineController.getRoutineListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific routine by ID.
 *     description: Endpoint to get details of a routine by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the routine to retrieve.
 *     responses:
 *       200:
 *         description: Routine details.
 *       404:
 *         description: Routine not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific routine.
 * @route GET /{fileName}
 */
routineRouter.get("/:fileName", [
    RoutineValidationService.validateRoutineParams,
    RoutineController.getARoutineController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete a routine by ID.
 *     description: Endpoint to delete a routine by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the routine to delete.
 *     responses:
 *       200:
 *         description: Routine successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Routine not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific routine.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
routineRouter.delete("/:fileName", [
    authTokenMiddleware,
    RoutineValidationService.validateRoutineParams,
    RoutineController.deleteARoutineController
]);

export default routineRouter;