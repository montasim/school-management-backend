/**
 * @fileoverview Blog Routes for Express Application.
 *
 * This module defines the routes for blog-related operations in the Express application.
 * It includes endpoints for creating, retrieving, updating, and deleting blog posts.
 * The routes are configured with necessary middleware for authentication, file uploading,
 * and validation. Swagger documentation annotations are also included to describe each
 * endpoint, its expected parameters, and responses. This setup facilitates clear and
 * organized handling of blog-related requests, ensuring proper authentication, data validation,
 * and response structuring.
 *
 * @requires express - Express framework to define routes.
 * @requires authTokenMiddleware - Middleware for authenticating tokens in requests.
 * @requires fileUploadMiddleware - Middleware for handling file uploads.
 * @requires BlogValidationService - Validators for blog post request data.
 * @requires BlogController - Controllers for handling blog post operations.
 * @module blogRouter - Express router with defined routes for blog operations.
 */

import express from "express";
import authTokenMiddleware from "../../middlewares/authTokenMiddleware.js";
import fileUploadMiddleware from "../../middlewares/fileUploadMiddleware.js";
import { BlogValidationService } from "./blog.validator.js";
import { BlogController } from "./blog.controller.js";

const blogRouter = express.Router();

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a blog.
 *     description: Endpoint to add a new blog to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the blog.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the blog.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the blog.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The blog post image file to upload.
 *     responses:
 *       200:
 *         description: Blog successfully created.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new blog.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
blogRouter.post("/", [
    authTokenMiddleware,
    fileUploadMiddleware.single('postImage'),
    BlogValidationService.validateNewBlogDetails,
    BlogController.createBlogController
]);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Retrieve all blogs.
 *     description: Endpoint to retrieve a list of all blogs.
 *     responses:
 *       200:
 *         description: A list of blogs.
 *       404:
 *         description: Blog not found.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving a list of all blogs.
 * @route GET /
 */
blogRouter.get("/", [
    BlogController.getBlogListController
]);

/**
 * @swagger
 * /{blogId}:
 *   get:
 *     summary: Retrieve a specific blog by ID.
 *     description: Endpoint to get details of a blog by their ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to retrieve.
 *     responses:
 *       200:
 *         description: Blog details.
 *       404:
 *         description: Blog not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles GET request for retrieving details of a specific blog.
 * @route GET /{blogId}
 */
blogRouter.get("/:blogId", [
    BlogValidationService.validateBlogParams,
    BlogController.getABlogController
]);

/**
 * @swagger
 * /{blogId}:
 *   put:
 *     summary: Update a blog.
 *     description: Endpoint to update an existing blog to the system.
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to update.
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the blog.
 *       - in: formData
 *         name: category
 *         type: string
 *         description: Category of the blog.
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the blog.
 *       - in: formData
 *         name: postImage
 *         type: file
 *         description: The blog post image file to upload.
 *     responses:
 *       200:
 *         description: Blog successfully updated.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles POST request for creating a new blog.
 * Applies authentication and file upload middleware.
 * @route POST /
 */
blogRouter.put("/:blogId", [
    authTokenMiddleware,
    fileUploadMiddleware.single('postImage'),
    BlogValidationService.validateBlogParams,
    BlogValidationService.validateUpdateBlogDetails,
    BlogController.updateABlogController
]);

/**
 * @swagger
 * /{blogId}:
 *   delete:
 *     summary: Delete a blog by ID.
 *     description: Endpoint to delete a blog by their ID.
 *     parameters:
 *       - in: path
 *         name: blogId
 *         required: true
 *         description: ID of the blog to delete.
 *     responses:
 *       200:
 *         description: Blog successfully deleted.
 *       401:
 *         description: Unauthorized request due to missing or invalid token.
 *       404:
 *         description: Blog not found with the provided ID.
 *       500:
 *         description: Internal server error.
 *
 * @description Handles DELETE request for deleting a specific blog.
 * Requires authentication.
 * @route DELETE /{blogId}
 */
blogRouter.delete("/:blogId", [
    authTokenMiddleware,
    BlogValidationService.validateBlogParams,
    BlogController.deleteABlogController
]);

export default blogRouter;