import express from "express";
import authenticationRoutes from "../modules/authentication/authentication.routes.js";
import administrationRoutes from "../modules/administration/administration.routes.js";
import categoryRoutes from "../modules/category/category.routes.js";
import levelRoutes from "../modules/level/level.routes.js";
import contactRoutes from "../modules/contact/contact.routes.js";
import downloadRoutes from "../modules/download/download.routes.js";
import noticeRoutes from "../modules/notice/notice.routes.js";
import resultRoutes from "../modules/result/result.routes.js";
import routineRoutes from "../modules/routine/routine.routes.js";
import studentRoutes from "../modules/student/student.routes.js";

const router = express.Router();

/**
 * Sets up routing for the authentication module.
 * @name /login
 * @function
 * @inner
 * @memberof module:routes
 */
router.use(`/authentication`, authenticationRoutes);

/**
 * Sets up versioned routing for the administration module.
 * @name /administration
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/administration", administrationRoutes);

/**
 * Sets up versioned routing for the blog module.
 * @name /blog
 * @function
 * @inner
 * @memberof module:routes
 */
// router.use(`/blog`, blogRoutes);

/**
 * Sets up versioned routing for the category module.
 * @name /category
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/category", categoryRoutes);

/**
 * Sets up versioned routing for the level module.
 * @name /level
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/level", levelRoutes);

/**
 * Sets up versioned routing for the contact module.
 * @name /contact
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/contact", contactRoutes);

/**
 * Sets up versioned routing for the download module.
 * @name /download
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/download", downloadRoutes);

/**
 * Sets up versioned routing for the notice module.
 * @name /notice
 * @function
 * @inner
 * @memberof module:routes
 */
router.use("/notice", noticeRoutes);

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
 * The main router object that combines all route modules.
 * @type {Router}
 * @namespace module:routes
 */
export default router;
