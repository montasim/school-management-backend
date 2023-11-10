/**
 * @fileoverview Main application router.
 *
 * This module defines the primary routes of the application. It includes routes for different modules
 * like index, status, API (versioned), and a catch-all for undefined routes. Additionally, it sets up
 * Swagger UI to serve API documentation based on a Swagger JSON file. This router acts as a central hub
 * for all HTTP routes used in the application, organizing them in a structured and manageable way.
 *
 * @requires express - Express framework for building web applications.
 * @requires fs - Node.js file system module for file operations.
 * @requires swaggerUi - Middleware for serving Swagger UI.
 * @requires API_VERSION - Configured API version.
 * @requires indexRoutes - Routes for the index module.
 * @requires statusRoutes - Routes for the status module.
 * @requires apiRoutes - Versioned routes for the API module.
 * @requires undefinedRoutes - Catch-all routes for undefined endpoints.
 * @module router - Express router combining all application routes.
 */

import express from "express";
import fs from "fs";
import swaggerUi from 'swagger-ui-express';
import { API_VERSION } from "../../config/config.js";
import indexRoutes from "../modules/index/index.routes.js";
import statusRoutes from "../modules/status/status.routes.js";
import apiRoutes from "./api.routes.js";
import undefinedRoutes from "../modules/undefined/undefined.routes.js";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../swagger.json'), 'utf8'));
const router = express.Router();

/**
 * Sets up routing for the index module.
 * @name /
 * @function
 * @inner
 * @memberof module:routes
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Sets up routing for the index module.
 * @name /
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/`, indexRoutes);

/**
 * Sets up routing for the status module.
 * @name /status
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/status`, statusRoutes);

/**
 * Sets up versioned routing for the administration module.
 * @name /api/${API_VERSION}/administration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/api/${API_VERSION}/`, apiRoutes);

/**
 * Default catch-all route for undefined routes.
 * @name *
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`*`, undefinedRoutes);

/**
 * The main router object that combines all route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;