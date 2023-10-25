import express from "express";
import { ClassValidators } from "./class.validator.js";
import { ClassController } from "./class.controller.js";

const router = express.Router();

/**
 * Handle POST request to create a new class.
 * @async
 * @function createClass
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @memberof module:classRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.post(
    "/",
    ClassValidators.classBodyValidator,
    ClassController.createClassController
);

/**
 * Handle GET request to retrieve all categories.
 * @async
 * @function getClassList
 * @memberof module:classRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/",
    ClassController.getClassListController
);

/**
 * Handle GET request to retrieve a specific class by its ID.
 * @async
 * @function getAClass
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.classId - ID of the class to retrieve.
 * @memberof module:classRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/:classId",
    ClassValidators.classParamsValidator,
    ClassController.getAClassController
);

/**
 * Handle PUT request to update a class by its ID.
 * @async
 * @function updateClass
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.classId - ID of the class to update.
 * @memberof module:classRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.put(
    "/:classId",
    ClassValidators.classParamsValidator,
    ClassValidators.classBodyValidator,
    ClassController.updateAClassController
);

/**
 * Handle DELETE request to delete a class by its ID.
 * @async
 * @function deleteClass
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.classId - ID of the class to delete.
 * @memberof module:classRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.delete(
    "/:classId",
    ClassValidators.classParamsValidator,
    ClassValidators.deleteClassQueryValidator,
    ClassController.deleteAClassController
);

/**
 * Exports the router that contains class-related routes.
 * @exports classRoutes
 */
export default router;
