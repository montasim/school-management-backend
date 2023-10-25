import express from "express";
import statusRoutes from "../modules/status/status.routes.js";
import administrationRoutes from "../modules/administration/administration.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import classRoutes from "../modules/class/class.routes.js";
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
 * Sets up versioned routing for the administration module.
 * @name /api/v1/administration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/api/v1/administration`, administrationRoutes);

/**
 * Sets up versioned routing for the blog module.
 * @name /api/v1/blog
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/blog`, blogRoutes);

/**
 * Sets up versioned routing for the category module.
 * @name /api/v1/category
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/api/v1/category`, categoryRoutes);

/**
 * Sets up versioned routing for the class module.
 * @name /api/v1/class
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/api/v1/class`, classRoutes);

/**
 * Sets up versioned routing for the download module.
 * @name /api/v1/download
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/download`, downloadRoutes);

/**
 * Sets up versioned routing for the notice module.
 * @name /api/v1/notice
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/notice`, noticeRoutes);

/**
 * Sets up versioned routing for the result module.
 * @name /api/v1/result
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/result`, resultRoutes);

/**
 * Sets up versioned routing for the routine module.
 * @name /api/v1/routine
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/routine`, routineRoutes);

/**
 * Sets up versioned routing for the student module.
 * @name /api/v1/student
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/api/v1/student`, studentRoutes);

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
