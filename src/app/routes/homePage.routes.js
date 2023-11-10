/**
 * @fileoverview Main router for the homepage-related features.
 *
 * This module combines route modules related to the homepage of the application,
 * including routes for homepage posts and homepage carousels. It acts as a central
 * point for aggregating all homepage-related routes and exposes them under a unified
 * namespace. This organization helps in maintaining a clean structure and easy navigation
 * of homepage functionalities.
 *
 * @requires express - The Express framework for handling HTTP requests.
 * @requires homePagePostRoutes - Routes for the homepage posts feature.
 * @requires homePageCarouselRoutes - Routes for the homepage carousel feature.
 * @module homePageRouter - Aggregated routes for homepage-related features.
 */

import express from "express";
import homePagePostRoutes from "../modules/homePage/homePagePost/homePagePost.routes.js";
import homePageCarouselRoutes from "../modules/homePage/homePageCarousel/homePageCarousel.routes.js";

const homePageRouter = express.Router();

/**
 * Sets up versioned routing for the homePagePost module.
 * @name /homePagePost
 * @function
 * @inner
 * @memberof module:routes
 */
homePageRouter.use("/homePagePost", homePagePostRoutes);

/**
 * Sets up versioned routing for the homePageCarousel module.
 * @name /homePageCarousel
 * @function
 * @inner
 * @memberof module:routes
 */
homePageRouter.use("/homePageCarousel", homePageCarouselRoutes);

/**
 * The main router object that combines the index page route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default homePageRouter;