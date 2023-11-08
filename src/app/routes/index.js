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
