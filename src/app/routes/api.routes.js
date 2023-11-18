/**
 * @fileoverview API router for the application.
 *
 * This module combines all individual route modules and sets up their respective paths.
 * It acts as a central point for importing and using all the defined routes in the application.
 * Each route is associated with a specific module, handling different aspects of the application like
 * announcements, authentication, blogs, categories, contacts, etc.
 *
 * @requires express - Express framework to create route handlers.
 * @requires administrationRoutes - Routes for administration module.
 * @requires announcementRoutes - Routes for announcement module.
 * @requires authenticationRoutes - Routes for authentication module.
 * @requires blogRoutes - Routes for blog module.
 * @requires categoryRoutes - Routes for category module.
 * @requires contactRoutes - Routes for contact module.
 * @requires dashboardRoutes - Routes for dashboard module.
 * @requires designationRoutes - Routes for designation module.
 * @requires downloadRoutes - Routes for download module.
 * @requires levelRoutes - Routes for level module.
 * @requires homePageRoutes - Routes for home page module.
 * @requires noticeRoutes - Routes for notice module.
 * @requires othersInformationRoutes - Routes for others information module.
 * @requires othersInformationCategoryRoutes - Routes for others information category module.
 * @requires resultRoutes - Routes for result module.
 * @requires routineRoutes - Routes for routine module.
 * @requires studentRoutes - Routes for student module.
 * @requires websiteRoutes - Routes for website module.
 * @module routes - Aggregated routes for the application.
 */

import express from "express";
import administrationRoutes from "../modules/administration/administration.routes.js";
import announcementRoutes from "../modules/announcement/announcement.routes.js";
import authenticationRoutes from "../modules/authentication/authentication.routes.js";
import blogRoutes from "../modules/blog/blog.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import contactRoutes from "../modules/contact/contact.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";
import designationRoutes from "../modules/designation/designation.routes.js";
import downloadRoutes from "../modules/download/download.routes.js";
import levelRoutes from "../modules/level/level.routes.js";
import homePageRoutes from "./homePage.routes.js";
import noticeRoutes from "../modules/notice/notice.routes.js";
import othersInformationRoutes from "../modules/othersInformation/othersInformation.routes.js";
import othersInformationCategoryRoutes from "../modules/othersInformationCategory/othersInformationCategory.routes.js";
import resultRoutes from "../modules/result/result.routes.js";
import routineRoutes from "../modules/routine/routine.routes.js";
import studentRoutes from "../modules/student/student.routes.js";
import websiteRoutes from "../routes/website.routes.js";
import galleryRoutes from "./gallery.routes.js";
import admissionRoutes from "./admission.routes.js";

/**
 * Sets up the main router for the application. This router is responsible for aggregating all the individual
 * route modules and assigning them to their respective base paths. Each base path corresponds to a different
 * module or functionality within the application. The router facilitates clear separation and organization
 * of different parts of the application's API, making it easier to manage and scale.
 *
 * @namespace router - Main router object combining all route modules.
 * @type {express.Router}
 * @example
 * // In the main server file:
 * app.use('/api', apiRouter); // Mounts the API router on '/api' base path.
 */
const router = express.Router();

/**
 * Sets up routing for the announcement module.
 * @name /announcement
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/admission`, admissionRoutes);

/**
 * Sets up routing for the announcement module.
 * @name /announcement
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/announcement`, announcementRoutes);

/**
 * Sets up versioned routing for the administration module.
 * @name /administration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/administration", administrationRoutes);

/**
 * Sets up routing for the authentication module.
 * @name /authentication
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/authentication`, authenticationRoutes);

/**
 * Sets up versioned routing for the blog module.
 * @name /blog
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/blog`, blogRoutes);

/**
 * Sets up versioned routing for the category module.
 * @name /category
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/category", categoryRoutes);

/**
 * Sets up versioned routing for the contact module.
 * @name /contact
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/contact", contactRoutes);

/**
 * Sets up routing for the dashboard module.
 * @name /dashboard
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/dashboard`, dashboardRoutes);
router.use("/contact", contactRoutes);

/**
 * Sets up routing for the designation module.
 * @name /designation
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/designation`, designationRoutes);

/**
 * Sets up versioned routing for the download module.
 * @name /download
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/download", downloadRoutes);

/**
 * Sets up versioned routing for the gallery module.
 * @name /gallery
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/gallery", galleryRoutes);

/**
 * Sets up versioned routing for the level module.
 * @name /level
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/level", levelRoutes);

/**
 * Sets up versioned routing for the homePagePost module.
 * @name /level
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/homePage", homePageRoutes);

/**
 * Sets up routing for the notice module.
 * @name /notice
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/notice", noticeRoutes);

/**
 * Sets up routing for the othersInformation module.
 * @name /othersInformation
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/othersInformation`, othersInformationRoutes);

/**
 * Sets up routing for the othersInformationCategory module.
 * @name /othersInformationCategory
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/othersInformationCategory`, othersInformationCategoryRoutes);

/**
 * Sets up versioned routing for the result module.
 * @name /result
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/result", resultRoutes);

/**
 * Sets up versioned routing for the routine module.
 * @name /routine
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/routine", routineRoutes);

/**
 * Sets up versioned routing for the student module.
 * @name /student
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/student", studentRoutes);

/**
 * Sets up routing for the website module.
 * @name /website
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/website`, websiteRoutes);

/**
 * The main router object that combines all route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;