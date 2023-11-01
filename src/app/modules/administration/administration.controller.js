import { AdministrationService } from "./administration.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createAdministrationController
 * @description Controller for creating a new administration.
 *
 * @param {express.Request} req - Express request object containing administration details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createAdministrationController = async (req, res) => {
    const { name, category, designation, image, adminId, db } = extractFromRequest(req, ['name', 'category', 'designation', 'image']);
    const newAdministration = { name, category, designation, image, adminId };

    await handleServiceResponse(res, AdministrationService.createAdministrationService, db, newAdministration);
};

/**
 * @async
 * @function getAdministrationListController
 * @description Controller for fetching all administrations.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAdministrationListController = async (req, res) => {
    await handleServiceResponse(res, AdministrationService.getAdministrationListService, req?.db);
};

/**
 * @async
 * @function getAAdministrationController
 * @description Controller for fetching a specific administration by ID.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAAdministrationController = async (req, res) => {
    const { administrationId, db } = extractFromRequest(req, [], ['administrationId']);

    await handleServiceResponse(res, AdministrationService.getAAdministrationService, db, administrationId);
};

/**
 * @async
 * @function updateAAdministrationController
 * @description Controller for updating a specific administration by ID.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAAdministrationController = async (req, res) => {
    const { administrationId, name, category, designation, image, adminId, db } = extractFromRequest(req, ['name', 'category', 'designation', 'image'], ['administrationId']);
    const updatedAdministrationDetails = { name, category, designation, image, adminId };

    await handleServiceResponse(res, AdministrationService.updateAAdministrationService, db, administrationId, updatedAdministrationDetails);
};

/**
 * @async
 * @function deleteAAdministrationController
 * @description Controller for deleting a administration by ID.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAAdministrationController = async (req, res) => {
    const { administrationId, adminId, db } = extractFromRequest(req, [], ['administrationId']);

    await handleServiceResponse(res, AdministrationService.deleteAAdministrationService, db, adminId, administrationId);
};

/**
 * @namespace AdministrationController
 * @description Group of controllers for handling administration operations.
 */
export const AdministrationController = {
    createAdministrationController,
    getAdministrationListController,
    getAAdministrationController,
    updateAAdministrationController,
    deleteAAdministrationController
};
