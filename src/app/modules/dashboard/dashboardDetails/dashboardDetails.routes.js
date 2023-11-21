/**
 * @fileoverview Routes for the Dashboard Details Module.
 *
 * This module sets up the Express router for the dashboard-related routes in the application.
 * It includes endpoints for fetching system summaries and other dashboard-related data.
 * The routes are secured with authentication middleware to ensure that only authenticated
 * users can access them. Each route is associated with a controller function from the
 * DashboardDetailsController module, which contains the logic to handle the specific requests.
 *
 * @requires express - Express framework to create router handlers.
 * @requires authTokenMiddleware - Middleware to authenticate and authorize users.
 * @requires DashboardDetailsController - Controller module for dashboard-related operations.
 * @module dashboardRoutes - Express router instance for dashboard routes.
 */

import express from "express";
import authTokenMiddleware from "../../../middlewares/authTokenMiddleware.js";
import { DashboardDetailsController } from "./dashboardDetails.controller.js";

const router = express.Router();

/**
 * @swagger
 * /summary:
 *   get:
 *     summary: Get the dashboard details.
 *     description: Endpoint to get the details of the system.
 *     responses:
 *       200:
 *         description: Details fetched successfully.
 *       500:
 *         description: Internal server error.
 */
router.get("/", [
    authTokenMiddleware,
    DashboardDetailsController.getDashboardDetailsController
]);


export default router;