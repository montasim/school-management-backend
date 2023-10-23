import express from "express";
import statusRoutes from "../modules/status/status.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import undefinedRoutes from "../modules/undefined/undefined.routes.js";

const router = express.Router();

/**
 * Sets up routing for the status module.
 * @name /status
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/status`, statusRoutes);

/**
 * Sets up versioned routing for the category module.
 * @name /api/v1/category
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/api/v1/category`, categoryRoutes);

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
