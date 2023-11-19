/**
 * @fileoverview Express router providing admissionForm-related routes.
 *
 * This module defines routes for creating, retrieving, and deleting admissionForms.
 * It includes middleware for authentication, file upload handling, and specific validations
 * related to admissionForm operations. Each route is documented using Swagger annotations for API
 * specification and JSDoc comments for internal code documentation.
 *
 * @requires express Express - Express framework for building web applications
 * @requires authTokenMiddleware - Middleware for authenticating tokens
 * @requires fileUploadMiddleware - Middleware for handling file uploads
 * @requires AdmissionFormValidationService - Service for validating admissionForm-related parameters
 * @requires AdmissionFormController - Controller for handling admissionForm-related operations
 * @module admissionFormRouter - Express router for admissionForm routes
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../../middlewares/fileUploadMiddleware.js";
import { AdmissionFormValidationService } from "./admissionForm.validator.js";
import { AdmissionFormController } from "./admissionForm.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create an admission form.
 *     description: Endpoint to add a new admission form to the system.
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
 *         description: Title of the admissionForm.
 *     responses:
 *       200:
 *         description: Admission form successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new admission form.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    AdmissionFormValidationService.validateNewAdmissionFormDetails,
    AdmissionFormController.createAdmissionFormController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all admission forms.
 *     description: Endpoint to retrieve a list of all admission forms.
 *     responses:
 *       200:
 *         description: A list of admission forms.
 *       404:
 *         description: Admission form not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all admission forms.
 * @route GET /
 */
router.get("/", [
    AdmissionFormController.getAdmissionFormListController
]);

/**
 * @swagger
 * /{fileName}:
 *   get:
 *     summary: Retrieve a specific admission form by ID.
 *     description: Endpoint to get details of an admission form by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the admission form to retrieve.
 *     responses:
 *       200:
 *         description: Admission form details.
 *       404:
 *         description: Admission form not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific admission form.
 * @route GET /{fileName}
 */
router.get("/:fileName", [
    AdmissionFormValidationService.validateAdmissionFormParams,
    AdmissionFormController.getAAdmissionFormController
]);

/**
 * @swagger
 * /{fileName}:
 *   delete:
 *     summary: Delete an admission form by ID.
 *     description: Endpoint to delete an admission form by their ID.
 *     parameters:
 *       - in: path
 *         name: fileName
 *         required: true
 *         description: ID of the admission form to delete.
 *     responses:
 *       200:
 *         description: Admission form successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Admission form not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific admission form.
 * Requires authentication.
 * @route DELETE /{fileName}
 */
router.delete("/:fileName", [
    authTokenMiddleware,
    AdmissionFormValidationService.validateAdmissionFormParams,
    AdmissionFormController.deleteAAdmissionFormController
]);

export default router;