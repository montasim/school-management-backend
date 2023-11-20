/**
 * @fileoverview Status and Health Check Routes
 *
 * This file sets up the routes for checking the status and health of the application.
 * It imports the express module to create a router, and then defines two routes:
 * 1. The root route ("/") - Handled by the statusController, which checks the basic operational status of the server.
 * 2. The health route ("/health") - Managed by the statusHealthController, which assesses the health of the system by verifying
 *    the integrity and availability of configurations and constants.
 *
 * These routes are essential for monitoring the application's health and ensuring its components are functioning as expected.
 *
 * @requires express - Express framework for creating the router.
 * @requires statusController - Controller for handling the root status check route.
 * @requires statusHealthController - Controller for handling the health check route.
 */

import express from "express";
import statusController from "./status.controller.js";
import statusHealthController from "../statusHealth/statusHealth.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   all:
 *     summary: Checks status of the system.
 *     description: Endpoint to check the status of the system.
 *     responses:
 *       200:
 *         description: Server is up and running.
 *       500:
 *         description: Server is down.
 */
router.all("/", statusController);

/**
 * @swagger
 * /health:
 *   all:
 *     summary: Checks health status of the system.
 *     description: Endpoint to check the health status of the system.
 *     responses:
 *       200:
 *         description: Configurations and Constants are working correctly.
 *       500:
 *         description: Internal server error.
 */
router.all("/health", statusHealthController);

export default router;