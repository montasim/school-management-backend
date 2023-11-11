/**
 * @fileoverview Administration Controller for Express Application.
 *
 * This module provides controller functions for handling administration-related routes in the application.
 * Each controller function is responsible for processing incoming requests related to administrations,
 * interacting with the AdministrationService to perform CRUD operations, and sending appropriate responses back to the client.
 * This centralizes the administration-related request handling logic, ensuring consistency and separation of concerns.
 *
 * @requires AdministrationService - Service layer handling business logic related to administrations.
 * @requires extractFromRequest - Helper function to extract data from request objects.
 * @requires handleServiceResponse - Helper function to handle responses from service layer.
 * @requires logger - Shared logging utility for error handling.
 * @module AdministrationController - Exported administration controller functions.
 */

import { AdministrationService } from "./administration.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * @async
 * @function createAdministrationController
 * @description Controller for creating a new administration.
 * @param {express.Request} req - Express request object containing administration details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const createAdministrationController = async (req, res) => {
    try {
        const { name, category, designation, adminId, db } = extractFromRequest(req, ['name', 'category', 'designation']);
        const newAdministrationDetails = { name, category, designation, adminId };

        await handleServiceResponse(res, AdministrationService.createAdministrationService, db, newAdministrationDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAdministrationList
 * @description Controller for fetching all other information.
 *
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAdministrationListController = async (req, res) => {
    try {
        await handleServiceResponse(res, AdministrationService.getAdministrationListService, req?.db);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAAdministration
 * @description Controller for fetching a specific administration by ID.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const getAAdministrationController = async (req, res) => {
    try {
        const { administrationId, db } = extractFromRequest(req, [], ['administrationId']);

        await handleServiceResponse(res, AdministrationService.getAAdministrationService, db, administrationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function updateAAdministration
 * @description Controller for updating a specific administration by ID.
 *
 * @param {express.Request} req - Express request object containing administration ID in parameters.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const updateAAdministrationController = async (req, res) => {
    try {
        const { administrationId, name, category, designation, adminId, db } = extractFromRequest(req, ['name', 'category', 'designation'], ['administrationId']);
        const updatedAdministrationDetails = { name, category, designation, adminId };

        await handleServiceResponse(res, AdministrationService.updateAAdministrationService, db, administrationId, updatedAdministrationDetails, req?.file);
    } catch (error) {
        logger.error(error);

        return error;
    }
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
    try {
        const { administrationId, adminId, db } = extractFromRequest(req, [], ['administrationId']);

        await handleServiceResponse(res, AdministrationService.deleteAAdministrationService, db, adminId, administrationId);
    } catch (error) {
        logger.error(error);

        return error;
    }
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