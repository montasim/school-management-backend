/**
 * @fileoverview Controllers for the Result Module.
 *
 * This module contains controller functions for handling result-related operations in the application.
 * It includes controllers for creating new results, fetching a list of all results, retrieving a specific
 * result by ID, and deleting a result. Each controller function is designed to be asynchronous and handles
 * the request-response cycle for its respective route, including extracting relevant data from the request,
 * validating file uploads, and interfacing with the ResultService to perform business logic operations.
 *
 * @requires ResultService - Service for handling result-related business logic.
 * @requires extractFromRequest - Helper function for extracting data from the request object.
 * @requires validateStringField - Helper function for validating file title.
 * @requires validateUploadedFile - Helper function for validating uploaded files.
 * @requires handleServiceResponse - Helper function for handling responses from services.
 * @requires logger - Shared logging utility.
 * @requires constants - Application constants, including MAX_PDF_FILE_SIZE and MIME_TYPE_PDF.
 * @module ResultController - Exported object containing result-related controller functions.
 */

import { ResultService } from "./result.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import validateStringField from "../../../helpers/validateStringField.js";
import validateUploadedFile from "../../../helpers/validateUploadedFile.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";
import { MAX_PDF_FILE_SIZE, MIME_TYPE_PDF } from "../../../constants/constants.js";

/**
 * Asynchronously handles the creation of a new result. This controller extracts result details from the request,
 * validates the uploaded file for size and type, and then calls the service to create the result record.
 *
 * @async
 * @function createResultController
 * @description Controller for creating a new result.
 * @param {express.Request} req - Express request object. Expected to contain title, adminId, db, and file.
 * @param {express.Response} res - Express response object used to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the file validation fails or if the service encounters an issue.
 */
const createResultController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newResultDetails = { title, adminId };

        validateStringField(res, 'title', title, 3, 1000);
        validateUploadedFile(res, req.file, MAX_PDF_FILE_SIZE, [MIME_TYPE_PDF]);

        await handleServiceResponse(res, ResultService.createResultService, db, newResultDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getResultListController
 * @description Controller for fetching all results.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getResultListController = async (req, res) => {
    try {
        await handleServiceResponse(res, ResultService.getResultListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAResultController
 * @description Controller for fetching a specific result by ID.
 *
 * @param {express.Request} req - Express request object containing result ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAResultController = async (req, res) => {
    try {
        const { fileName, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, ResultService.getAResultService, db, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAResultController
 * @description Controller for deleting a result by ID.
 *
 * @param {express.Request} req - Express request object containing result ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAResultController = async (req, res) => {
    try {
        const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, ResultService.deleteAResultService, db, adminId, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace ResultController
 * @description Group of controllers for handling result operations.
 */
export const ResultController = {
    createResultController,
    getResultListController,
    getAResultController,
    deleteAResultController
};