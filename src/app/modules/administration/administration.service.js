/**
 * @fileoverview Administration Service for Handling Administration Data Operations.
 *
 * This module provides services for managing administration-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting administration posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on administration data.
 *
 * @requires uuid - Module for generating unique identifiers.
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module AdministrationService - Exported services for administration operations.
 */

import { v4 as uuidv4 } from 'uuid';
import { ADMINISTRATION_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { ADMINISTRATION_CONSTANTS } from "./administration.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../shared/logger.js";
import deleteById from "../../../shared/deleteById.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findById from "../../../shared/findById.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import updateById from "../../../shared/updateById.js";

/**
 * Creates a new administration entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newAdministrationDetails - Object containing details of the new administration.
 * @param {Object} file - The file object for the administration's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the administration.
 */
const createAdministrationService = async (db, newAdministrationDetails, file) => {
    try {
        const { name, category, designation, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const administrationDetails = {
            id: `${ADMINISTRATION_CONSTANTS?.ADMINISTRATION_ID_PREFIX}-${uuidv4().substr(0, 6)}`,
            name: name,
            category: category,
            designation: designation,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await addANewEntryToDatabase(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails);
        const latestData = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationDetails?.id);

        delete latestData?._id;
        delete latestData?.createdBy;
        delete latestData?.modifiedBy;
        delete latestData.googleDriveFileId;

        return result?.acknowledged
            ? generateResponseData(latestData, true, STATUS_OK, `${name} created successfully`)
            : generateResponseData({}, false, STATUS_INTERNAL_SERVER_ERROR, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @async
 * @function getAdministrationListService
 * @description Service for retrieving a list of all administrations from the database,
 * optionally filtered by categories. The results are sorted by the 'createdAt' field in
 * descending order, ensuring the latest data is returned first.
 *
 * @param {Object} db - Database connection object.
 * @param {Array<string>} categoryFilter - An array of category names to filter the administrations by.
 *                                         If the array is empty or not provided, no filtering is applied.
 * @returns {Promise<Object>} A promise that resolves to the response object containing the list of administrations
 *                            or an error message. The response includes a success status, HTTP status code, and
 *                            a message indicating the number of administrations found or an error message.
 * @throws {Error} Throws an error if any issue occurs during the database query execution.
 */
const getAdministrationListService = async (db, categoryFilter) => {
    try {
        let query = {};
        // Apply the category filter if provided
        if (categoryFilter?.length > 0) {
            // Use $in operator to match any of the categories
            query = { 'category': { $in: categoryFilter } };
        }

        // Retrieve and sort administrations from the database based on the query
        const administration = await db?.collection(ADMINISTRATION_COLLECTION_NAME)
            .find(query)
            .sort({ 'createdAt': -1 }) // Sort by 'createdAt' in descending order
            .toArray();

        // Generate and return the response data
        return administration?.length
            ? generateResponseData(administration, true, STATUS_OK, `${administration?.length} administration found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No administration found with the given categories');
    } catch (error) {
        // Log and return any errors encountered
        logger.error(error);
        return error;
    }
};

/**
 * Retrieves a specific homePageAdministration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} administrationId - The ID of the homePageAdministration to retrieve.
 * @returns {Object} - The homePageAdministration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAAdministrationService = async (db, administrationId) => {
    try {
        const administration = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        if (!administration)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);

        delete administration?._id;
        delete administration?.createdBy;
        delete administration?.modifiedBy;
        delete administration.googleDriveFileId;

        return generateResponseData(administration, true, STATUS_OK, `${administrationId} found successfully`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageAdministration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} administrationId - The ID of the homePageAdministration to retrieve.
 * @param newAdministrationDetails
 * @param {Object} file - The file object for the administration's associated image or content.
 * @returns {Object} - The homePageAdministration details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAAdministrationService = async (db, administrationId, newAdministrationDetails, file) => {
    try {
        const { name, category, designation, adminId } = newAdministrationDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Retrieve the current details of the administration
        const oldDetails = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);

        // Initialize the object to store updated details
        const updatedAdministrationDetails = { ...oldDetails };

        // Update file if provided
        if (file) {
            await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails.googleDriveFileId);
            const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

            if (!uploadGoogleDriveFileResponse?.shareableLink)
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

            updatedAdministrationDetails.googleDriveFileId = uploadGoogleDriveFileResponse.fileId;
            updatedAdministrationDetails.googleDriveShareableLink = uploadGoogleDriveFileResponse.shareableLink;
        }

        // Update name, category, and designation if provided
        if (name) updatedAdministrationDetails.name = name;
        if (category) updatedAdministrationDetails.category = category;
        if (designation) updatedAdministrationDetails.designation = designation;

        // Update modifiedBy and modifiedAt
        updatedAdministrationDetails.modifiedBy = adminId;
        updatedAdministrationDetails.modifiedAt = new Date();

        // Update the administration
        const result = await updateById(db, ADMINISTRATION_COLLECTION_NAME, administrationId, updatedAdministrationDetails);

        // Remove unnecessary data before sending response
        delete updatedAdministrationDetails._id;
        delete updatedAdministrationDetails.createdBy;
        delete updatedAdministrationDetails.modifiedBy;
        delete updatedAdministrationDetails.googleDriveFileId;

        return result?.modifiedCount
            ? generateResponseData(updatedAdministrationDetails, true, STATUS_OK, `${administrationId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${administrationId} not updated`);

    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageAdministration by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} administrationId - The ID of the homePageAdministration to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAAdministrationService = async (db, adminId, administrationId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${administrationId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteById(db, ADMINISTRATION_COLLECTION_NAME, administrationId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${administrationId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${administrationId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageAdministrationService
 * @description Group of services related to homePageAdministration operations.
 */
export const AdministrationService = {
    createAdministrationService,
    getAdministrationListService,
    getAAdministrationService,
    updateAAdministrationService,
    deleteAAdministrationService
};