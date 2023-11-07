import { DesignationService } from "./designation.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function createDesignationController
 * @description Controller for creating a new designation.
 *
 * @param {express.Request} req - Express request object containing designation details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createDesignationController = async (req, res) => {
    const { name, adminId, db } = extractFromRequest(req, ['name']);
    const newDesignation = { name, adminId };

    await handleServiceResponse(res, DesignationService.createDesignationService, db, newDesignation);
};

/**
 * @async
 * @function getDesignationListController
 * @description Controller for fetching all designation.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getDesignationListController = async (req, res) => {
    await handleServiceResponse(res, DesignationService.getDesignationListService, req?.db);
};

/**
 * @async
 * @function getADesignationController
 * @description Controller for fetching a specific designation by ID.
 *
 * @param {express.Request} req - Express request object containing designation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getADesignationController = async (req, res) => {
    const { designationId, db } = extractFromRequest(req, [], ['designationId']);

    await handleServiceResponse(res, DesignationService.getADesignationService, db, designationId);
};

/**
 * @async
 * @function updateADesignationController
 * @description Controller for updating a specific designation by ID.
 *
 * @param {express.Request} req - Express request object containing designation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateADesignationController = async (req, res) => {
    const { designationId, name, adminId, db } = extractFromRequest(req, ['name'], ['designationId']);
    const updatedDesignationDetails = { name, adminId };

    await handleServiceResponse(res, DesignationService.updateADesignationService, db, designationId, updatedDesignationDetails);
};

/**
 * @async
 * @function deleteADesignationController
 * @description Controller for deleting a designation by ID.
 *
 * @param {express.Request} req - Express request object containing designation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteADesignationController = async (req, res) => {
    const { designationId, adminId, db } = extractFromRequest(req, [], ['designationId']);

    await handleServiceResponse(res, DesignationService.deleteADesignationService, db, adminId, designationId);
};

/**
 * @namespace DesignationController
 * @description Group of controllers for handling designation operations.
 */
export const DesignationController = {
    createDesignationController,
    getDesignationListController,
    getADesignationController,
    updateADesignationController,
    deleteADesignationController
};
