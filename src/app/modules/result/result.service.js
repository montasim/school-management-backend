/**
 * @module ResultService
 * @description This module provides services related to results such as creating, listing, retrieving, and deleting result entries in the database.
 */

import {v4 as uuidv4} from "uuid";
import fs from "fs";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import {RESULT_COLLECTION_NAME} from "../../../constants/index.js";

/**
 * Creates a new result entry in the database.
 *
 * @async
 * @function
 * @param {object} db - MongoDB database instance.
 * @param {object} newResultDetails - Details of the result.
 * @param {object} file - File uploaded via multer middleware.
 * @returns {Promise<object>} A promise that resolves to an object representing the operation's result.
 * @throws Will throw an error if an error occurs.
 */
const createResultService = async (db,  newResultDetails, file) => {
    try {
        const {
            title,
            requestedBy
        } = newResultDetails;
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const prepareNewResultDetails = {
                id: `result-${uuidv4().substr(0, 6)}`,
                title: title,
                filename: file?.originalname,
                path: file?.path,
                createdBy: requestedBy,
                createdAt: new Date(),
            };
            const result = await db
                .collection(RESULT_COLLECTION_NAME)
                .insertOne(prepareNewResultDetails);

            if (result?.acknowledged) {
                const fileDetails = await db
                    .collection(RESULT_COLLECTION_NAME)
                    .findOne({ filename: prepareNewResultDetails?.filename }, { projection: { _id: 0 } });

                return {
                    data: fileDetails,
                    success: true,
                    status: 200,
                    message: `${fileDetails?.filename} uploaded successfully`
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: 422,
                    message: 'Error while uploading file'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 401,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a list of all result entries from the database.
 *
 * @async
 * @function
 * @param {object} db - MongoDB database instance.
 * @returns {Promise<object>} A promise that resolves to an object containing a list of files or an error message.
 * @throws Will throw an error if an error occurs.
 */
const getResultListService = async (db) => {
    try {
        const classList = await db
            .collection(RESULT_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (classList?.length > 0) {
            return {
                data: classList,
                success: true,
                status: 200,
                message: `${classList?.length} file found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: 'No file found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a specific result entry from the database based on its filename.
 *
 * @async
 * @function
 * @param {object} db - MongoDB database instance.
 * @param {string} fileName - The name of the file to retrieve.
 * @returns {Promise<object>} A promise that resolves to an object with file details or an error message.
 * @throws Will throw an error if an error occurs.
 */
const getAResultService = async (db, fileName) => {
    try {
        const file = await db
            .collection(RESULT_COLLECTION_NAME)
            .findOne({ filename: fileName }, { projection: { _id: 0 } });

        if (file) {
            return {
                data: file,
                success: true,
                status: 200,
                message: 'File fetched successfully'
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: 'File not found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes a specific result entry from the database based on its filename.
 *
 * @async
 * @function
 * @param {object} db - MongoDB database instance.
 * @param {string} requestedBy - Identifier of the requester.
 * @param {string} fileName - The name of the file to delete.
 * @returns {Promise<object>} A promise that resolves to an object representing the deletion operation's result.
 * @throws Will throw an error if an error occurs.
 */
const deleteAResultService = async (db, requestedBy, fileName) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const fileDetails = await db
                .collection(RESULT_COLLECTION_NAME)
                .findOne({ filename: fileName }, { projection: { _id: 0 } });
            const result = await db
                .collection(RESULT_COLLECTION_NAME)
                .deleteOne({ filename: fileName });

            if (result?.acknowledged) {
                // Check if file exists
                if (fs.existsSync(fileDetails?.path)) {
                    // Delete the file
                    fs.unlink(fileDetails?.path, (error) => {
                        if (error) {
                            return {
                                data: {},
                                success: false,
                                status: 500,
                                message: 'Internal server error'
                            };
                        } else {
                            return {
                                data: result,
                                success: true,
                                status: 200,
                                message: `${fileName} deleted successfully`
                            };
                        }
                    });
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 404,
                        message: 'File not found'
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: 'File not found'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 401,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * @typedef {Object} ResultService
 * @property {function} createResultService - Function to create a result entry.
 * @property {function} getResultListService - Function to retrieve a list of results.
 * @property {function} getAResultService - Function to fetch a specific result entry.
 * @property {function} deleteAResultService - Function to delete a specific result entry.
 */

/** @type {ResultService} */
export const ResultService = {
    createResultService,
    getResultListService,
    getAResultService,
    deleteAResultService
};
