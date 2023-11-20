/**
 * @fileoverview AdmissionInformation Controller for Express Application.
 *
 * This module provides controller functions for handling admissionInformation-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to admissionInformation,
 * interacting with the AdmissionInformationService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the admissionInformation-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires AdmissionInformationService - Service layer handling business logic related to admissionInformation.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module AdmissionInformationController - Exported admissionInformation controller functions.
 */

import { AdmissionInformationService } from "./admissionInformation.service.js";
import extractFromRequest from "../../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../../helpers/handleServiceResponse.js";
import logger from "../../../../shared/logger.js";

/**
 * @async
 * @function createAdmissionInformationController
 * @description Controller for creating a new admissionInformation.
 * @param {express.Request} req - Express request object containing admissionInformation details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createAdmissionInformationController = async (req, res) => {
    try {
        const { title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId, db } = extractFromRequest(req, ['title', 'description', 'formPrice', 'admissionFee', 'lastFormSubmissionData', 'contact']);
        const newAdmissionInformationDetails = { title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId };

        await handleServiceResponse(res, AdmissionInformationService.createAdmissionInformationService, db, newAdmissionInformationDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAdmissionInformationList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAdmissionInformationListController = async (req, res) => {
    try {
        await handleServiceResponse(res, AdmissionInformationService.getAdmissionInformationListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAAdmissionInformation
 * @description Controller for fetching a specific admissionInformation by ID.
 *
 * @param {express.Request} req - Express request object containing admissionInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAAdmissionInformationController = async (req, res) => {
    try {
        const { admissionInformationId, db } = extractFromRequest(req, [], ['admissionInformationId']);

        await handleServiceResponse(res, AdmissionInformationService.getAAdmissionInformationService, db, admissionInformationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAAdmissionInformation
 * @description Controller for updating a specific admissionInformation by ID.
 *
 * @param {express.Request} req - Express request object containing admissionInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAAdmissionInformationController = async (req, res) => {
    try {
        const { admissionInformationId, title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId, db } = extractFromRequest(req, ['title', 'description', 'formPrice', 'admissionFee', 'lastFormSubmissionData', 'contact'], ['admissionInformationId']);
        const updatedAdmissionInformationDetails = { title, description, formPrice, admissionFee, lastFormSubmissionData, contact, adminId };

        await handleServiceResponse(res, AdmissionInformationService.updateAAdmissionInformationService, db, admissionInformationId, updatedAdmissionInformationDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function deleteAAdmissionInformationController
 * @description Controller for deleting a admissionInformation by ID.
 *
 * @param {express.Request} req - Express request object containing admissionInformation ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const deleteAAdmissionInformationController = async (req, res) => {
    try {
        const { admissionInformationId, adminId, db } = extractFromRequest(req, [], ['admissionInformationId']);

        await handleServiceResponse(res, AdmissionInformationService.deleteAAdmissionInformationService, db, adminId, admissionInformationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace AdmissionInformationController
 * @description Group of controllers for handling admissionInformation operations.
 */
export const AdmissionInformationController = {
    createAdmissionInformationController,
    getAdmissionInformationListController,
    getAAdmissionInformationController,
    updateAAdmissionInformationController,
    deleteAAdmissionInformationController
};