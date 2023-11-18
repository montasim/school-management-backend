/**
 * @fileoverview AdmissionInformation Routes for Express Application.
 *
 * This module defines the routes for admission information-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting admission information posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of admission information-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires AdmissionInformationValidationService - Validators for admission information post request data.
 * @requires AdmissionInformationController - Controllers for handling admission information post operations.
 * @module admissionInformationRouter - Express router with defined routes for admission information operations.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { AdmissionInformationValidationService } from "./admissionInformation.validator.js";
import { AdmissionInformationController } from "./admissionInformation.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create an admission information.
 *     description: Endpoint to add a new admission information to the system.
 *     parameters:
 *       - in: body
 *         name: title
 *         type: string
 *         description: Title of the admission information.
 *       - in: body
 *         name: description
 *         type: string
 *         description: Description of the admission information.
 *       - in: body
 *         name: formFee
 *         type: string
 *         description: Form fee for the class.
 *       - in: body
 *         name: admissionFee
 *         type: string
 *         description: Admission fee for the class.
 *       - in: body
 *         name: lastFormSubmissionDate
 *         type: string
 *         description: Last form submission date for the class
 *     responses:
 *       200:
 *         description: Admission information successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new admission information.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    AdmissionInformationController.createAdmissionInformationController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all admission information.
 *     description: Endpoint to retrieve a list of all admission information's.
 *     responses:
 *       200:
 *         description: A list of admission information.
 *       404:
 *         description: AdmissionInformation not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all admission information.
 * @route GET /
 */
router.get("/", [
    AdmissionInformationController.getAdmissionInformationListController
]);

/**
 * @swagger
 * /{admissionInformationId}:
 *   get:
 *     summary: Retrieve a specific admission information by ID.
 *     description: Endpoint to get details of an admission information by their ID.
 *     parameters:
 *       - in: path
 *         name: admissionInformationId
 *         required: true
 *         description: ID of the admission information to retrieve.
 *     responses:
 *       200:
 *         description: AdmissionInformation details.
 *       404:
 *         description: AdmissionInformation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific admission information.
 * @route GET /{admissionInformationId}
 */
router.get("/:admissionInformationId", [
    AdmissionInformationValidationService.validateAdmissionInformationParams,
    AdmissionInformationController.getAAdmissionInformationController
]);

/**
 * @swagger
 * /{admissionInformationId}:
 *   put:
 *     summary: Update an admission information.
 *     description: Endpoint to update an existing admission information to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: admissionInformationId
 *         required: true
 *         description: ID of the admission information to update.
 *       - in: body
 *         name: title
 *         type: string
 *         description: Title of the admission information.
 *       - in: body
 *         name: description
 *         type: string
 *         description: Description of the admission information.
 *       - in: body
 *         name: formFee
 *         type: string
 *         description: Form fee for the class.
 *       - in: body
 *         name: admissionFee
 *         type: string
 *         description: Admission fee for the class.
 *       - in: body
 *         name: lastFormSubmissionDate
 *         type: string
 *         description: Last form submission date for the class
 *     responses:
 *       200:
 *         description: AdmissionInformation successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new admission information.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.put("/:admissionInformationId", [
    authTokenMiddleware,
    AdmissionInformationValidationService.validateAdmissionInformationParams,
    AdmissionInformationController.updateAAdmissionInformationController
]);

/**
 * @swagger
 * /{admissionInformationId}:
 *   delete:
 *     summary: Delete an admission information by ID.
 *     description: Endpoint to delete an admission information by their ID.
 *     parameters:
 *       - in: path
 *         name: admissionInformationId
 *         required: true
 *         description: ID of the admission information to delete.
 *     responses:
 *       200:
 *         description: AdmissionInformation successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: AdmissionInformation not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific admission information.
 * Requires authentication.
 * @route DELETE /{admissionInformationId}
 */
router.delete("/:admissionInformationId", [
    authTokenMiddleware,
    AdmissionInformationValidationService.validateAdmissionInformationParams,
    AdmissionInformationController.deleteAAdmissionInformationController
]);

export default router;