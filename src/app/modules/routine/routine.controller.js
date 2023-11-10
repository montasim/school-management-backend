/**
 * @fileoverview Controllers for the Routine Module.
 *
 * This module contains controller functions for handling routine-related operations in the application.
 * It includes controllers for creating new routines, fetching a list of all routines, retrieving a specific
 * routine by ID, and deleting a routine. Each controller function is designed to be asynchronous and handles
 * the request-response cycle for its respective route, including extracting relevant data from the request,
 * validating file uploads, and interfacing with the RoutineService to perform business logic operations.
 *
 * @requires RoutineService - Service for handling routine-related business logic.
 * @requires extractFromRequest - Helper function for extracting data from the request object.
 * @requires validateFileTitle - Helper function for validating file title.
 * @requires validateUploadedFile - Helper function for validating uploaded files.
 * @requires handleServiceResponse - Helper function for handling responses from services.
 * @requires logger - Shared logging utility.
 * @requires constants - Application constants, including MAX_PDF_FILE_SIZE and MIME_TYPE_PDF.
 * @module RoutineController - Exported object containing routine-related controller functions.
 */

import { RoutineService } from "./routine.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import validateFileTitle from "../../../helpers/validateFileTitle.js";
import validateUploadedFile from "../../../helpers/validateUploadedFile.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";
import {
    MAX_PDF_FILE_SIZE,
    MIME_TYPE_PDF,
} from "../../../constants/constants.js";

/**
 * Asynchronously handles the creation of a new routine. This controller extracts routine details from the request,
 * validates the uploaded file for size and type, and then calls the service to create the routine record.
 *
 * @async
 * @function createRoutineController
 * @description Controller for creating a new routine.
 * @param {express.Request} req - Express request object. Expected to contain title, adminId, db, and file.
 * @param {express.Response} res - Express response object used to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the file validation fails or if the service encounters an issue.
 */
const createRoutineController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newRoutineDetails = { title, adminId };

        await validateFileTitle(res, title);
        await validateUploadedFile(res, req.file, MAX_PDF_FILE_SIZE, [MIME_TYPE_PDF]);
        await handleServiceResponse(res, RoutineService.createRoutineService, db, newRoutineDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getRoutineListController
 * @description Controller for fetching all routines.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getRoutineListController = async (req, res) => {
    try {
        await handleServiceResponse(res, RoutineService.getRoutineListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getARoutineController
 * @description Controller for fetching a specific routine by ID.
 *
 * @param {express.Request} req - Express request object containing routine ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getARoutineController = async (req, res) => {
    try {
        const { fileName, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, RoutineService.getARoutineService, db, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteARoutineController
 * @description Controller for deleting a routine by ID.
 *
 * @param {express.Request} req - Express request object containing routine ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteARoutineController = async (req, res) => {
    try {
        const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, RoutineService.deleteARoutineService, db, adminId, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace RoutineController
 * @description Group of controllers for handling routine operations.
 */
export const RoutineController = {
    createRoutineController,
    getRoutineListController,
    getARoutineController,
    deleteARoutineController
};