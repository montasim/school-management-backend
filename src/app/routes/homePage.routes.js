import express from "express";
import homePagePostRoutes from "../modules/homePagePost/homePagePost.routes.js";
import homePageCarouselRoutes from "../modules/homePageCarousel/homePageCarousel.routes.js";

const router = express.Router();

/**
 * Sets up versioned routing for the homePagePost module.
 * @name /homePagePost
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/homePagePost", homePagePostRoutes);

/**
 * Sets up versioned routing for the homePageCarousel module.
 * @name /homePageCarousel
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/homePageCarousel", homePageCarouselRoutes);

/**
 * The main router object that combines the home page route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;