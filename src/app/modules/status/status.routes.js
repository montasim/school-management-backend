import express from "express";
import statusController from "./status.controller.js";

const router = express.Router();

/**
 * Routes all requests to the statusController.
 * @function
 * @name all
 * @memberof module:express.Router
 * @param {string} path - A path pattern to route.
 * @param {module:express.RequestHandler} callback - The statusController function.
 */
router.all("*", statusController);

export default router;
