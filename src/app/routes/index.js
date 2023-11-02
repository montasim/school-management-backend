import express from "express";
import swaggerUi from 'swagger-ui-express';

import { API_VERSION } from "../../config/config.js";

import homeRoutes from "../modules/home/home.routes.js";
import statusRoutes from "../modules/status/status.routes.js";
import apiRoutes from "./api.routes.js";
import undefinedRoutes from "../modules/undefined/undefined.routes.js";
import fs from "fs";

const router = express.Router();
const swaggerDocument = JSON.parse(fs.readFileSync('./swagger.json', 'utf8'));

/**
 * Sets up routing for the home module.
 * @name /
 * @function
 * @inner
 * @memberof module:routes
 */
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/**
 * Sets up routing for the home module.
 * @name /
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/`, homeRoutes);

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
