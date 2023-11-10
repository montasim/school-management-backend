/**
 * @fileoverview Controllers for the Notice Module.
 *
 * This module contains controller functions for handling notice-related operations in the application.
 * It includes controllers for creating new notices, fetching a list of all notices, retrieving a specific
 * notice by ID, and deleting a notice. Each controller function is designed to be asynchronous and handles
 * the request-response cycle for its respective route, including extracting relevant data from the request,
 * validating file uploads, and interfacing with the NoticeService to perform business logic operations.
 *
 * @requires NoticeService - Service for handling notice-related business logic.
 * @requires extractFromRequest - Helper function for extracting data from the request object.
 * @requires validateFileTitle - Helper function for validating file title.
 * @requires validateUploadedFile - Helper function for validating uploaded files.
 * @requires handleServiceResponse - Helper function for handling responses from services.
 * @requires logger - Shared logging utility.
 * @requires constants - Application constants, including MAX_PDF_FILE_SIZE and MIME_TYPE_PDF.
 * @module NoticeController - Exported object containing notice-related controller functions.
 */

import { NoticeService } from "./notice.service.js";
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
 * Asynchronously handles the creation of a new notice. This controller extracts notice details from the request,
 * validates the uploaded file for size and type, and then calls the service to create the notice record.
 *
 * @async
 * @function createNoticeController
 * @description Controller for creating a new notice.
 * @param {express.Request} req - Express request object. Expected to contain title, adminId, db, and file.
 * @param {express.Response} res - Express response object used to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the file validation fails or if the service encounters an issue.
 */
const createNoticeController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newNoticeDetails = { title, adminId };

        await validateFileTitle(res, title);
        await validateUploadedFile(res, req.file, MAX_PDF_FILE_SIZE, [MIME_TYPE_PDF]);
        await handleServiceResponse(res, NoticeService.createNoticeService, db, newNoticeDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getNoticeListController
 * @description Controller for fetching all notices.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getNoticeListController = async (req, res) => {
    try {
        await handleServiceResponse(res, NoticeService.getNoticeListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getANoticeController
 * @description Controller for fetching a specific notice by ID.
 *
 * @param {express.Request} req - Express request object containing notice ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getANoticeController = async (req, res) => {
    try {
        const { fileName, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, NoticeService.getANoticeService, db, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteANoticeController
 * @description Controller for deleting a notice by ID.
 *
 * @param {express.Request} req - Express request object containing notice ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteANoticeController = async (req, res) => {
    try {
        const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, NoticeService.deleteANoticeService, db, adminId, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace NoticeController
 * @description Group of controllers for handling notice operations.
 */
export const NoticeController = {
    createNoticeController,
    getNoticeListController,
    getANoticeController,
    deleteANoticeController
};