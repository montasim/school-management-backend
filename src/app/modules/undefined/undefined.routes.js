/**
 * @fileoverview Router setup for handling undefined or non-existent routes in the Express application.
 *
 * This file creates an Express router that intercepts all requests not matched by other
 * routes in the application. It redirects these requests to the undefinedController,
 * which handles them appropriately by providing a standardized response. This is useful
 * for catching and handling requests to non-existent endpoints in the application,
 * ensuring that the application can gracefully handle such scenarios.
 *
 * Additionally, this file contains Swagger documentation comments that describe the API
 * endpoint, including the types of responses that can be expected from it.
 */

import express from "express";
import undefinedController from "./undefined.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Checks undefined route of the system.
 *     description: Endpoint to check the undefined route of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.:
 *       500:
 *         description: Server is down.
 */
router.all("*", undefinedController);

export default router;