import express from "express";
import homePagePostRoutes from "../modules/homePagePost/homePagePost.routes.js";

const router = express.Router();

/**
 * Sets up versioned routing for the homePagePost module.
 * @name /level
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/homePagePost", homePagePostRoutes);

/**
 * The main router object that combines the home page route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;