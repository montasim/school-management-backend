import express from "express";
import websiteConfigurationRoutes from "../modules/website/websiteConfiguration/websiteConfiguration.routes.js";
import websiteContactRoutes from "../modules/website/websiteContact/websiteContact.routes.js";
import websiteImportantInformationLinkRoutes from "../modules/website/websiteImportantInformationLink/websiteImportantInformationLink.routes.js";

const router = express.Router();

/**
 * Sets up versioned routing for the configuration module.
 * @name /configuration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/configuration", websiteConfigurationRoutes);

/**
 * Sets up versioned routing for the configuration module.
 * @name /configuration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/contact", websiteContactRoutes);

/**
 * Sets up versioned routing for the social media module.
 * @name /social-media
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use("/social-media", websiteSocialMediaRoutes);

/**
 * Sets up versioned routing for the official link module.
 * @name /official-link
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use("/official-link", websiteOfficialLinkRoutes);

/**
 * Sets up versioned routing for the important information link module.
 * @name /important-information-link
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/important-information-link", websiteImportantInformationLinkRoutes);

/**
 * The main router object that combines the index page route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;