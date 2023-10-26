import { StatusCodes } from "http-status-codes";
import { AdministrationService } from "./administration.service.js";

/**
 * Creates an administration.
 *
 * The function processes the incoming request data to create a new administration.
 * It interacts with the service layer to perform the actual creation of the administration.
 * After creation, the service's response is sent back to the client.
 *
 * @async
 * @function createAdministrationController
 * @param {Object} req - Express request object. Contains details about the client's request, such as URL parameters, headers, and body data.
 * @param {Object} req.body - The body of the request.
 * @param {string} req.body.name - Name of the administration.
 * @param {string} req.body.requestedBy - User or entity requesting the administration creation.
 * @param {Object} res - Express response object. Allows you to craft an HTTP response.
 * @returns {Object} Express response object with a status and JSON body.
 *
 * @throws Will throw an error if the service encounters an issue during administration creation.
 */
const createAdministrationController = async (req, res) => {
    try {
        const {
            name,
            category,
            designation,
            image,
            requestedBy
        } = req?.body;
        const newAdministrationDetails = {
            name,
            category,
            designation,
            image,
            requestedBy
        };
        const createAdministrationServiceResponse = AdministrationService.createAdministrationService(req?.db, newAdministrationDetails);
        const returnData = {
            data: createAdministrationServiceResponse?.data,
            success: createAdministrationServiceResponse?.success,
            status: createAdministrationServiceResponse?.status,
            message: createAdministrationServiceResponse?.message,
        };

        return res.status(createAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a list of categories.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Route parameters.
 * @param {?string} req.params.administrationId - ID of the administration (if provided in the request).
 * @param {Object} req.db - Database connection or instance.
 * @param {Object} res - Express response object.
 *
 * @returns {Object} res - Express response object.
 * @returns {Object} res.data - The list of categories.
 * @returns {boolean} res.success - Success flag.
 * @returns {number} res.status - HTTP status code.
 * @returns {string} res.message - Response message.
 *
 * @throws {Error} Throws an error if any occurs during execution.
 */
const getAdministrationListController = async (req, res) => {
    try {
        const createAdministrationServiceResponse = await AdministrationService.getAdministrationListService(req?.db);
        const returnData = {
            data: createAdministrationServiceResponse?.data,
            success: createAdministrationServiceResponse?.success,
            status: createAdministrationServiceResponse?.status,
            message: createAdministrationServiceResponse?.message,
        };

        return res.status(createAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Retrieves a specific administration based on its ID.
 *
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Parameters from the request URL.
 * @param {string} req.params.administrationId - ID of the administration to retrieve.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object containing the administration details.
 *
 * @throws {Error} Throws an error if there's an issue fetching the administration.
 *
 * @example
 * // Request URL: GET /administration/1234
 * const administration = await getAAdministrationController(req, res);
 */
const getAAdministrationController = async (req, res) => {
    try {
        const { administrationId } = req?.params;
        const createAdministrationServiceResponse = AdministrationService.getAAdministrationService(req?.db, administrationId);
        const returnData = {
            data: createAdministrationServiceResponse?.data,
            success: createAdministrationServiceResponse?.success,
            status: createAdministrationServiceResponse?.status,
            message: createAdministrationServiceResponse?.message,
        };

        return res.status(createAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Update an administration based on the provided administration ID and details.
 *
 * @function
 * @async
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 *
 * @property {string} req.params.administrationId - The ID of the administration to be updated.
 * @property {Object} req.body - The body of the request containing the details to update.
 * @property {string} req.body.name - The name of the administration.
 * @property {string} req.body.requestedBy - The name of the person requesting the update.
 *
 * @returns {express.Response} res - The response object.
 * @returns {Object} res.body - The response body.
 * @returns {Object} res.body.data - The updated administration details.
 * @returns {boolean} res.body.success - Indicates the success of the operation.
 * @returns {number} res.body.status - The HTTP status code.
 * @returns {string} res.body.message - A message describing the outcome of the operation.
 *
 * @throws {Error} Throws an error if there's an issue updating the administration.
 */
const updateAAdministrationController = async (req, res) => {
    try {
        const { administrationId } = req?.params;
        const {
            name,
            category,
            designation,
            image,
            requestedBy
        } = req?.body;
        const newAdministrationDetails = {
            name,
            category,
            designation,
            image,
            requestedBy
        };
        const updatedAdministrationServiceResponse = await AdministrationService.updateAAdministrationService(req?.db, administrationId, newAdministrationDetails);
        const returnData = {
            data: updatedAdministrationServiceResponse?.data,
            success: updatedAdministrationServiceResponse?.success,
            status: updatedAdministrationServiceResponse?.status,
            message: updatedAdministrationServiceResponse?.message,
        };

        return res.status(updatedAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Deletes an administration based on the provided administration ID.
 *
 * @async
 * @function
 * @param {Object} req - The Express request object.
 * @param {Object} req.params - The parameters from the URL.
 * @param {string} req.params.administrationId - The ID of the administration to be deleted.
 * @param {Object} req.query - The query parameters from the request.
 * @param {string} req.query.requestedBy - The entity requesting the deletion.
 * @param {Object} res - The Express response object.
 * @returns {Object} - The response object containing status, data, success flag, and a message.
 *
 * @throws {Error} - Throws an error if there's an issue during deletion.
 */
const deleteAAdministrationController = async (req, res) => {
    try {
        const { administrationId } = req?.params;
        const { requestedBy } = req?.query;
        const deletedAdministrationServiceResponse = await AdministrationService.deleteAAdministrationService(req?.db, requestedBy, administrationId);
        const returnData = {
            data: deletedAdministrationServiceResponse?.data,
            success: deletedAdministrationServiceResponse?.success,
            status: deletedAdministrationServiceResponse?.status,
            message: deletedAdministrationServiceResponse?.message,
        };

        return res.status(deletedAdministrationServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * @module AdministrationController - Controller for administration-related operations.
 */
export const AdministrationController = {
    createAdministrationController,
    getAdministrationListController,
    getAAdministrationController,
    updateAAdministrationController,
    deleteAAdministrationController
};