/**
 * Routes module to handle undefined routes.
 * @module routes/undefinedRoutes
 */

import express from "express";
import undefinedController from "./undefined.controller.js";

const router = express.Router();

/**
 * Handle all routes that are not explicitly defined elsewhere in the application.
 * @name all/undefined
 * @function
 * @memberof module:routes/undefinedRoutes
 * @inner
 * @param {string} path - Express path.
 * @param {callback} middleware - Express middleware.
 */
router.all("*", undefinedController);

export default router;
