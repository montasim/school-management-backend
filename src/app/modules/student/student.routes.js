/**
 * @fileoverview Student Routes for Express Application.
 *
 * This module defines the routes for student-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting student posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of student-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires StudentValidationService - Validators for student post request data.
 * @requires StudentController - Controllers for handling student post operations.
 * @module studentRouter - Express router with defined routes for student operations.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { StudentValidationService } from "./student.validator.js";
import { StudentController } from "./student.controller.js";
import { CacheMiddleware } from "../../middlewares/cacheMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a student.
 *     description: Endpoint to add a new student to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the student.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the student.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the student.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The student post image file to upload.
 *     responses:
 *       200:
 *         description: Student successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new student.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    StudentValidationService.validateNewStudentDetails,
    CacheMiddleware.deleteCacheMiddleware,
    StudentController.createStudentController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all students.
 *     description: Endpoint to retrieve a list of all students.
 *     responses:
 *       200:
 *         description: A list of students.
 *       404:
 *         description: Student not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all students.
 * @route GET /
 */
router.get("/", [
    CacheMiddleware.createCacheMiddleware,
    StudentController.getStudentListController
]);

/**
 * @swagger
 * /{studentId}:
 *   get:
 *     summary: Retrieve a specific student by ID.
 *     description: Endpoint to get details of a student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to retrieve.
 *     responses:
 *       200:
 *         description: Student details.
 *       404:
 *         description: Student not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific student.
 * @route GET /{studentId}
 */
router.get("/:studentId", [
    StudentValidationService.validateStudentParams,
    CacheMiddleware.createCacheMiddleware,
    StudentController.getAStudentController
]);

/**
 * @swagger
 * /{studentId}:
 *   put:
 *     summary: Update a student.
 *     description: Endpoint to update an existing student to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to update.
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the student.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the student.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the student.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The student post image file to upload.
 *     responses:
 *       200:
 *         description: Student successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new student.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
router.put("/:studentId", [
    authTokenMiddleware,
    fileUploadMiddleware.single('file'),
    StudentValidationService.validateStudentParams,
    StudentValidationService.validateUpdateStudentDetails,
    CacheMiddleware.deleteCacheMiddleware,
    StudentController.updateAStudentController
]);

/**
 * @swagger
 * /{studentId}:
 *   delete:
 *     summary: Delete a student by ID.
 *     description: Endpoint to delete a student by their ID.
 *     parameters:
 *       - in: path
 *         name: studentId
 *         required: true
 *         description: ID of the student to delete.
 *     responses:
 *       200:
 *         description: Student successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Student not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific student.
 * Requires authentication.
 * @route DELETE /{studentId}
 */
router.delete("/:studentId", [
    authTokenMiddleware,
    StudentValidationService.validateStudentParams,
    CacheMiddleware.deleteCacheMiddleware,
    StudentController.deleteAStudentController
]);

export default router;