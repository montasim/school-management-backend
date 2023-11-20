/**
 * @fileoverview Express router for the index route of the application.
 *
 * This file configures the Express router to handle requests to the root ("/") endpoint
 * of the application. It is responsible for directing these requests to the appropriate
 * controller, in this case, the indexController. This endpoint serves as the entry point
 * or index of the system, typically used to confirm that the server is operational.
 *
 * The file also includes Swagger documentation annotations. These annotations are used
 * to generate API documentation, providing details like the summary, description, and
 * expected responses for the endpoint.
 */

import express from "express";
import indexController from "./index.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Index of the system.
 *     description: Endpoint to check the index of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.:
 *       500:
 *         description: Server is down.
 */
router.all("/", indexController);

export default router;