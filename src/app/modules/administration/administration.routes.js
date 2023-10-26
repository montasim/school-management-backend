import express from "express";
import { AdministrationValidators } from "./administration.validator.js";
import { AdministrationController } from "./administration.controller.js";

const router = express.Router();

/**
 * Handle POST request to create a new administration.
 * @async
 * @function createAdministration
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @memberof module:administrationRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.post(
    "/",
    AdministrationValidators.administrationBodyValidator,
    AdministrationController.createAdministrationController
);

/**
 * Handle GET request to retrieve all categories.
 * @async
 * @function getAdministrationList
 * @memberof module:administrationRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/",
    AdministrationController.getAdministrationListController
);

/**
 * Handle GET request to retrieve a specific administration by its ID.
 * @async
 * @function getAAdministration
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.administrationId - ID of the administration to retrieve.
 * @memberof module:administrationRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.get(
    "/:administrationId",
    AdministrationValidators.administrationParamsValidator,
    AdministrationController.getAAdministrationController
);

/**
 * Handle PUT request to update an administration by its ID.
 * @async
 * @function updateAdministration
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.administrationId - ID of the administration to update.
 * @memberof module:administrationRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.put(
    "/:administrationId",
    AdministrationValidators.administrationParamsValidator,
    AdministrationValidators.administrationBodyValidator,
    AdministrationController.updateAAdministrationController
);

/**
 * Handle DELETE request to delete a administration by its ID.
 * @async
 * @function deleteAdministration
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next middleware function.
 * @param {string} req.params.administrationId - ID of the administration to delete.
 * @memberof module:administrationRoutes
 * @inner
 * @returns {express.Response} res - Express response object.
 */
router.delete(
    "/:administrationId",
    AdministrationValidators.administrationParamsValidator,
    AdministrationValidators.deleteAdministrationQueryValidator,
    AdministrationController.deleteAAdministrationController
);

/**
 * Exports the router that contains administration-related routes.
 * @exports administrationRoutes
 */
export default router;
