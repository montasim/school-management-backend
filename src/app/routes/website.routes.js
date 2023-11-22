/**
 * @fileoverview Main router for website-related features.
 *
 * This module aggregates and configures routing for various website-related features, such as
 * website configuration, contact information, social media links, official links, and important
 * information links. Each route is associated with a specific aspect of the website, thereby
 * organizing the website functionalities into a structured and manageable format.
 *
 * @requires express - Express framework to define and manage routes for the web application.
 * @requires websiteBannerRoutes - Routes for website banner management.
 * @requires websiteConfigurationRoutes - Routes for website configuration management.
 * @requires websiteContactRoutes - Routes for managing website contact information.
 * @requires websiteImportantInformationLinkRoutes - Routes for managing important information links.
 * @requires websiteOfficialLinkRoutes - Routes for managing official links of the website.
 * @requires websiteSocialMediaRoutes - Routes for managing social media links.
 * @module router - Express router to combine and export all website-related routes.
 */

import express from "express";
import websiteBannerRoutes from "../modules/website/websiteBanner/websiteBanner.routes.js";
import websiteConfigurationRoutes from "../modules/website/websiteConfiguration/websiteConfiguration.routes.js";
import websiteContactRoutes from "../modules/website/websiteContact/websiteContact.routes.js";
import websiteImportantInformationLinkRoutes from "../modules/website/websiteImportantInformationLink/websiteImportantInformationLink.routes.js";
import websiteOfficialLinkRoutes from "../modules/website/websiteOfficialLink/websiteOfficialLink.routes.js";
import websiteSocialMediaRoutes from "../modules/website/websiteSocialMedia/websiteSocialMediaLink.routes.js";

const websiteRouter = express.Router();

/**
 * Sets up versioned routing for the banner module.
 * @name /banner
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/banner", websiteBannerRoutes);

/**
 * Sets up versioned routing for the configuration module.
 * @name /configuration
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/configuration", websiteConfigurationRoutes);

/**
 * Sets up versioned routing for the configuration module.
 * @name /configuration
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/contact", websiteContactRoutes);

/**
 * Sets up versioned routing for the social media module.
 * @name /socialMediaLink
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/socialMediaLink", websiteSocialMediaRoutes);

/**
 * Sets up versioned routing for the official link module.
 * @name /officialLink
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/officialLink", websiteOfficialLinkRoutes);

/**
 * Sets up versioned routing for the important information link module.
 * @name /importantInformationLink
 * @function
 * @inner
 * @memberof module:routes
 */
websiteRouter.use("/importantInformationLink", websiteImportantInformationLinkRoutes);

/**
 * The main router object that combines the index page route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default websiteRouter;