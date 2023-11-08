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

const router = express.Router();

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
