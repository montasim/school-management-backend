/**
 * @fileoverview AdmissionInformation Service for Handling AdmissionInformation Data Operations.
 *
 * This module provides services for managing admissionInformation-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting admissionInformation posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on admissionInformation data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module AdmissionInformationService - Exported services for admissionInformation operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { ADMISSION_INFORMATION_COLLECTION_NAME } from "../../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../../constants/constants.js";
import { ID_CONSTANTS } from "./admissionInformation.constants.js";
import isValidRequest from "../../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../../shared/logger.js";
import deleteByField from "../../../../shared/deleteByField.js";
import generateResponseData from "../../../../shared/generateResponseData.js";
import findByField from "../../../../shared/findByField.js";
import addANewEntryToDatabase from "../../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../../shared/updateById.js";
import getAllData from "../../../../shared/getAllData.js";

/**
 * Creates a new admissionInformation entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newAdmissionInformationDetails - Object containing details of the new admissionInformation.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the admissionInformation.
 */
const createAdmissionInformationService = async (db, newAdmissionInformationDetails) => {
    try {
        const { title, description, formFee, admissionFee, lastFormSubmissionData, contact, adminId } = newAdmissionInformationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const admissionInformationDetails = {
            id: `${ID_CONSTANTS?.ADMISSION_INFORMATION_PREFIX}-${uuidv4().substr(0, 6)}`,
            title: title,
            description: description,
            formFee: formFee,
            admissionFee: admissionFee,
            lastFormSubmissionData: lastFormSubmissionData,
            contact: contact,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, ADMISSION_INFORMATION_COLLECTION_NAME, admissionInformationDetails);
        const latestData = await findByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, 'id', admissionInformationDetails?.id);

        delete latestData?._id;
        delete latestData?.createdBy;
        delete latestData?.modifiedBy;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, "Admission information created successfully")
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a list of all homePageAdmissionInformation from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @returns {Object} - The list of homePageAdmissionInformation or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAdmissionInformationListService = async (db) => {
    try {
        const admissionInformation = await getAllData(db, ADMISSION_INFORMATION_COLLECTION_NAME);

        return admissionInformation?.length
            ? generateResponseData(admissionInformation, true, STATUS_OK, `${admissionInformation?.length} admissionInformation found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageAdmissionInformation found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageAdmissionInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} admissionInformationId - The ID of the homePageAdmissionInformation to retrieve.
 * @returns {Object} - The homePageAdmissionInformation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAAdmissionInformationService = async (db, admissionInformationId) => {
    try {
        const admissionInformation = await findByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, 'id', admissionInformationId);

        delete admissionInformation?._id;
        delete admissionInformation?.createdBy;
        delete admissionInformation?.modifiedBy;

        return admissionInformation
            ? generateResponseData(admissionInformation, true, STATUS_OK, `${admissionInformationId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageAdmissionInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} admissionInformationId - The ID of the homePageAdmissionInformation to retrieve.
 * @param newAdmissionInformationDetails
 * @returns {Object} - The homePageAdmissionInformation details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAAdmissionInformationService = async (db, admissionInformationId, newAdmissionInformationDetails) => {
    try {
        const { title, description, formFee, admissionFee, lastFormSubmissionData, contact, adminId } = newAdmissionInformationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, admissionInformationId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);

        const updatedAdmissionInformationDetails = {
            title: title,
            description: description,
            formFee: formFee,
            admissionFee: admissionFee,
            lastFormSubmissionData: lastFormSubmissionData,
            contact: contact,
            modifiedBy: adminId,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, ADMISSION_INFORMATION_COLLECTION_NAME, admissionInformationId, updatedAdmissionInformationDetails);
        const latestData = await findByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, admissionInformationId);

        delete latestData.createdBy;
        delete latestData.modifiedBy;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${admissionInformationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${admissionInformationId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageAdmissionInformation by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} admissionInformationId - The ID of the homePageAdmissionInformation to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAAdmissionInformationService = async (db, adminId, admissionInformationId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, admissionInformationId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${admissionInformationId} not found`);

        const result = await deleteByField(db, ADMISSION_INFORMATION_COLLECTION_NAME, 'id', admissionInformationId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${admissionInformationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${admissionInformationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageAdmissionInformationService
 * @description Group of services related to homePageAdmissionInformation operations.
 */
export const AdmissionInformationService = {
    createAdmissionInformationService,
    getAdmissionInformationListService,
    getAAdmissionInformationService,
    updateAAdmissionInformationService,
    deleteAAdmissionInformationService
};