import express from "express";
import homeController from "./home.controller.js";

const router = express.Router();

/**
 * Routes all requests to the homeController.
 * @function
 * @name all
 * @memberof module:express.Router
 * @param {string} path - A path pattern to route.
 * @param {module:express.RequestHandler} callback - The homeController function.
 */
router.all("*", homeController);

export default router;
