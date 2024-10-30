/**
 * @fileoverview Controllers for the AdmissionForm Module.
 *
 * This module contains controller functions for handling admissionForm-related operations in the application.
 * It includes controllers for creating new admissionForms, fetching a list of all admissionForms, retrieving a specific
 * admissionForm by ID, and deleting a admissionForm. Each controller function is designed to be asynchronous and handles
 * the request-response cycle for its respective route, including extracting relevant data from the request,
 * validating file uploads, and interfacing with the AdmissionFormService to perform business logic operations.
 *
 * @requires AdmissionFormService - Service for handling admissionForm-related business logic.
 * @requires extractFromRequest - Helper function for extracting data from the request object.
 * @requires validateStringField - Helper function for validating file title.
 * @requires validateUploadedFile - Helper function for validating uploaded files.
 * @requires handleServiceResponse - Helper function for handling responses from services.
 * @requires logger - Shared logging utility.
 * @requires constants - Application constants, including MAX_PDF_FILE_SIZE and MIME_TYPE_PDF.
 * @module AdmissionFormController - Exported object containing admissionForm-related controller functions.
 */

import { AdmissionFormService } from "./admissionForm.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import validateStringField from "../../../../helpers/validateStringField.js";
import validateUploadedFile from "../../../../helpers/validateUploadedFile.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";
import { MAX_PDF_FILE_SIZE, MIME_TYPE_PDF } from "../../../../constants/constants.js";

/**
 * Asynchronously handles the creation of a new admissionForm. This controller extracts admissionForm details from the request,
 * validates the uploaded file for size and type, and then calls the service to create the admissionForm record.
 *
 * @async
 * @function createAdmissionFormController
 * @description Controller for creating a new admissionForm.
 * @param {express.Request} req - Express request object. Expected to contain title, adminId, db, and file.
 * @param {express.Response} res - Express response object used to send data back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 * @throws Will throw an error if the file validation fails or if the service encounters an issue.
 */
const createAdmissionFormController = async (req, res) => {
    try {
        const { title, adminId, db } = extractFromRequest(req, ['title']);
        const newAdmissionFormDetails = { title, adminId };

        validateStringField(res, 'title', title, 3, 1000);
        validateUploadedFile(res, req.file, MAX_PDF_FILE_SIZE, [MIME_TYPE_PDF]);

        await handleServiceResponse(res, AdmissionFormService.createAdmissionFormService, req, newAdmissionFormDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAdmissionFormListController
 * @description Controller for fetching all admissionForms.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAdmissionFormListController = async (req, res) => {
    try {
        await handleServiceResponse(res, AdmissionFormService.getAdmissionFormListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAAdmissionFormController
 * @description Controller for fetching a specific admissionForm by ID.
 *
 * @param {express.Request} req - Express request object containing admissionForm ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAAdmissionFormController = async (req, res) => {
    try {
        const { fileName, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, AdmissionFormService.getAAdmissionFormService, db, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAAdmissionFormController
 * @description Controller for deleting a admissionForm by ID.
 *
 * @param {express.Request} req - Express request object containing admissionForm ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAAdmissionFormController = async (req, res) => {
    try {
        const { fileName, adminId, db } = extractFromRequest(req, [], ['fileName']);

        await handleServiceResponse(res, AdmissionFormService.deleteAAdmissionFormService, db, adminId, fileName);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace AdmissionFormController
 * @description Group of controllers for handling admissionForm operations.
 */
export const AdmissionFormController = {
    createAdmissionFormController,
    getAdmissionFormListController,
    getAAdmissionFormController,
    deleteAAdmissionFormController
};