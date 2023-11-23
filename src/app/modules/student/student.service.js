/**
 * @fileoverview Student Service for Handling Student Data Operations.
 *
 * This module provides services for managing student-related operations in the application.
 * It includes functions for creating, retrieving, updating, and deleting student posts,
 * along with interactions with the Google Drive API for file management.
 * These services abstract the database and file system interactions, providing a
 * clean interface for the controller layer to perform CRUD operations on student data.
 *
 * @requires config - Configuration file for application settings.
 * @requires constants - Application constants for status messages and codes.
 * @requires isValidRequest - Utility function to validate requests.
 * @requires GoogleDriveFileOperations - Helper module for Google Drive file operations.
 * @requires logger - Shared logging utility for error handling.
 * @module StudentService - Exported services for student operations.
 */

import { LEVEL_COLLECTION_NAME, STUDENT_COLLECTION_NAME } from "../../../config/config.js";
import {
    FORBIDDEN_MESSAGE, STATUS_BAD_REQUEST,
    STATUS_FORBIDDEN,
    STATUS_INTERNAL_SERVER_ERROR,
    STATUS_NOT_FOUND,
    STATUS_OK,
    STATUS_UNPROCESSABLE_ENTITY
} from "../../../constants/constants.js";
import { STUDENT_CONSTANTS } from "./student.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import { GoogleDriveFileOperations } from "../../../helpers/GoogleDriveFileOperations.js"
import logger from "../../../shared/logger.js";
import deleteByField from "../../../shared/deleteByField.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import findByField from "../../../shared/findByField.js";
import createByDetails from "../../../shared/createByDetails.js";
import updateById from "../../../shared/updateById.js";
import generateUniqueID from "../../../helpers/generateUniqueID.js";

/**
 * Creates a new student entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newStudentDetails - Object containing details of the new student.
 * @param {Object} file - The file object for the student's associated image or content.
 * @returns {Promise<Object>} A promise that resolves to the response object after creating the student.
 */
const createStudentService = async (db, newStudentDetails, file) => {
    try {
        const { name, level, adminId } = newStudentDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const levelExists = await findByField(db, LEVEL_COLLECTION_NAME, 'name', level);

        if (!levelExists) {
            return generateResponseData({}, false, STATUS_BAD_REQUEST, `Level '${level}' does not exist`);
        }

        const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

        if (!uploadGoogleDriveFileResponse?.shareableLink)
            return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

        const studentDetails = {
            id: generateUniqueID(STUDENT_CONSTANTS?.STUDENT_ID_PREFIX),
            name: name,
            level: level,
            googleDriveFileId: uploadGoogleDriveFileResponse?.fileId,
            googleDriveShareableLink: uploadGoogleDriveFileResponse?.shareableLink,
            downloadLink: uploadGoogleDriveFileResponse?.downloadLink,
            createdBy: adminId,
            createdAt: new Date(),
        };

        const result = await createByDetails(db, STUDENT_COLLECTION_NAME, studentDetails);
        const latestData = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentDetails?.id);

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
 * Retrieves a list of all homePageStudent from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param categoryFilter
 * @returns {Object} - The list of homePageStudent or an error message.
 * @throws {Error} Throws an error if any.
 */
const getStudentListService = async (db, categoryFilter) => {
    try {
        let query = {};
        // Apply the category filter if provided
        if (categoryFilter?.length > 0) {
            // Use $in operator to match any of the categories
            query = { 'level': { $in: categoryFilter } };
        }

        // Retrieve and sort administrations from the database based on the query
        const student = await db?.collection(STUDENT_COLLECTION_NAME)
            .find(query)
            .sort({ 'createdAt': -1 }) // Sort by 'createdAt' in descending order
            .toArray();

        return student?.length
            ? generateResponseData(student, true, STATUS_OK, `${student?.length} student found`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, 'No homePageStudent found');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageStudent by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} studentId - The ID of the homePageStudent to retrieve.
 * @returns {Object} - The homePageStudent details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAStudentService = async (db, studentId) => {
    try {
        const student = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        delete student?._id;
        delete student?.createdBy;
        delete student?.modifiedBy;
        delete student.googleDriveFileId;

        return student
            ? generateResponseData(student, true, STATUS_OK, `${studentId} found successfully`)
            : generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Retrieves a specific homePageStudent by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} studentId - The ID of the homePageStudent to retrieve.
 * @param newStudentDetails
 * @param {Object} file - The file object for the student's associated image or content.
 * @returns {Object} - The homePageStudent details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAStudentService = async (db, studentId, newStudentDetails, file) => {
    try {
        const { name, level, adminId } = newStudentDetails;

        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        // Retrieve the current details of the student
        const oldDetails = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);

        // Initialize the object to store updated details
        const updatedStudentDetails = { ...oldDetails };

        // Update name and level if provided
        if (name) updatedStudentDetails.name = name;

        if (level) {
            const levelExists = await findByField(db, LEVEL_COLLECTION_NAME, 'name', level);

            if (!levelExists) {
                return generateResponseData({}, false, STATUS_BAD_REQUEST, `Level '${level}' does not exist`);
            } else {
                updatedStudentDetails.level = level;
            }
        }

        // Update file if provided
        if (file) {
            await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails.googleDriveFileId);
            const uploadGoogleDriveFileResponse = await GoogleDriveFileOperations.uploadFileToDrive(file);

            if (!uploadGoogleDriveFileResponse?.shareableLink)
                return generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, 'Failed to upload in the google drive. Please try again');

            updatedStudentDetails.googleDriveFileId = uploadGoogleDriveFileResponse.fileId;
            updatedStudentDetails.googleDriveShareableLink = uploadGoogleDriveFileResponse.shareableLink;
            updatedStudentDetails.downloadLink = uploadGoogleDriveFileResponse.downloadLink;
        }

        // Update modifiedBy and modifiedAt
        updatedStudentDetails.modifiedBy = adminId;
        updatedStudentDetails.modifiedAt = new Date();

        // Update the student data
        const result = await updateById(db, STUDENT_COLLECTION_NAME, studentId, updatedStudentDetails);

        // Retrieve the updated data
        const latestData = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        // Remove unnecessary data before sending response
        delete latestData._id;
        delete latestData.createdBy;
        delete latestData.modifiedBy;
        delete latestData.googleDriveFileId;

        return result?.modifiedCount
            ? generateResponseData(latestData, true, STATUS_OK, `${studentId} updated successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${studentId} not updated`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Deletes a specific homePageStudent by ID from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user ID making the request.
 * @param {string} studentId - The ID of the homePageStudent to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAStudentService = async (db, adminId, studentId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        const oldDetails = await findByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        if (!oldDetails)
            return generateResponseData({}, false, STATUS_NOT_FOUND, `${studentId} not found`);

        await GoogleDriveFileOperations.deleteFileFromDrive(oldDetails?.googleDriveFileId);

        const result = await deleteByField(db, STUDENT_COLLECTION_NAME, 'id', studentId);

        return result
            ? generateResponseData({}, true, STATUS_OK, `${studentId} deleted successfully`)
            : generateResponseData({}, false, STATUS_UNPROCESSABLE_ENTITY, `${studentId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace HomePageStudentService
 * @description Group of services related to homePageStudent operations.
 */
export const StudentService = {
    createStudentService,
    getStudentListService,
    getAStudentService,
    updateAStudentService,
    deleteAStudentService
};