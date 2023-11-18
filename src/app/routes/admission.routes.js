/**
 * @fileoverview Admission Routes Module.
 *
 * This module sets up routing for the admission-related features in an Express application. It imports and uses separate route handlers for
 * different aspects of the admission process: admission information and admission forms. The routes are structured under different base paths
 * to organize the API endpoints logically. This module centralizes the admission-related routes and makes them accessible under a unified structure
 * in the application's routing system.
 *
 * @module admissionRoutes
 */

import express from "express";
import admissionFormRoutes from "../modules/admission/admissionForm/admissionForm.routes.js";
import admissionInformationRoutes from "../modules/admission/admissionInformation/admissionInformation.routes.js";

const router = express.Router();

/**
 * Use the admission information routes.
 * Routes under '/information' are handled by the admissionInformationRoutes module,
 * which contains specific endpoints related to admission information.
 */
router.use("/information", admissionInformationRoutes);

/**
 * Use the admission form routes.
 * Routes under '/form' are handled by the admissionFormRoutes module,
 * which contains specific endpoints for handling admission forms.
 */
router.use("/form", admissionFormRoutes);

export default router;