/**
 * @fileoverview Controllers for the Download Module.
 *
 * This module contains controller functions for handling download-related operations in the application.
 * It includes controllers for creating new downloads, fetching a list of all downloads, retrieving a specific
 * download by ID, and deleting a download. Each controller function is designed to be asynchronous and handles
 * the request-response cycle for its respective route, including extracting relevant data from the request,
 * validating file uploads, and interfacing with the DownloadService to perform business logic operations.
 *
 * @requires DownloadService - Service for handling download-related business logic.
 * @requires extractFromRequest - Helper function for extracting data from the request object.
 * @requires validateUploadedFile - Helper function for validating uploaded files.
 * @requires handleServiceResponse - Helper function for handling responses from services.
 * @requires logger - Shared logging utility.
 * @requires constants - Application constants, including MAX_PDF_FILE_SIZE and MIME_TYPE_PDF.
 * @module DownloadController - Exported object containing download-related controller functions.
 */

import { DownloadService } from "./download.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import validateUploadedFile from "../../../helpers/validateUploadedFile.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";
import {
    FILE_EXTENSION_TYPE_PDF,
    MAX_PDF_FILE_SIZE,
    MIME_TYPE_PDF,
} from "../../../constants/constants.js";

/**
 * Asynchronously handles the creation of a new download. This controller extracts download details from the request,
 * validates the uploaded file for size and type, and then calls the service to create the download record.
 *
 * @async
 * @function createDownloadController
 * @description Controller for creating a new download.
 * @param {express.Request} req - Express request object. Expected to contain title, adminId, db, and file.
 * @param {express.Response} res - Express response object used to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the file validation fails or if the service encounters an issue.
 */
const createDownloadController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newDownloadDetails = { title, adminId };

        await validateUploadedFile(res, req.file, MAX_PDF_FILE_SIZE, [MIME_TYPE_PDF]);
        await handleServiceResponse(res, DownloadService.createDownloadService, db, newDownloadDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getDownloadListController
 * @description Controller for fetching all downloads.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getDownloadListController = async (req, res) => {
    try {
        await handleServiceResponse(res, DownloadService.getDownloadListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getADownloadController
 * @description Controller for fetching a specific download by ID.
 *
 * @param {express.Request} req - Express request object containing download ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getADownloadController = async (req, res) => {
    try {
        const { fileName, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, DownloadService.getADownloadService, db, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteADownloadController
 * @description Controller for deleting a download by ID.
 *
 * @param {express.Request} req - Express request object containing download ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteADownloadController = async (req, res) => {
    try {
        const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, DownloadService.deleteADownloadService, db, adminId, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace DownloadController
 * @description Group of controllers for handling download operations.
 */
export const DownloadController = {
    createDownloadController,
    getDownloadListController,
    getADownloadController,
    deleteADownloadController
};