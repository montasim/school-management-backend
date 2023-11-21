/**
 * @fileoverview Dashboard Routes Module.
 *
 * This module configures the routing for dashboard-related features within an Express application. It incorporates routing for both photo and video
 * galleries, organizing these under distinct base paths for clarity and ease of access. The module imports route handlers from separate modules
 * for photo and video galleries and maps them to their respective paths. This setup facilitates a clear and manageable structure for handling
 * dashboard-related requests in the application.
 *
 * @module dashboardRoutes
 */

import express from "express";
import dashboardDetailsRoutes from "../modules/dashboard/dashboardDetails/dashboardDetails.routes.js";

const router = express.Router();

/**
 * Routes for the Photo Dashboard.
 * All requests on the '/photo' path are forwarded to the photoDashboardRoutes module,
 * which contains specific endpoints and logic for handling photo dashboard related operations.
 */
router.use("/details", dashboardDetailsRoutes);

/**
 * Routes for the Video Dashboard.
 * All requests on the '/video' path are forwarded to the videoDashboardRoutes module,
 * which contains specific endpoints and logic for handling video dashboard related operations.
 */
router.use("/summary", dashboardDetailsRoutes);
export default router;