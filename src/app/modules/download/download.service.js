import { StatusCodes } from "http-status-codes";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import {DOWNLOAD_COLLECTION_NAME} from "../../../constants/index.js";


/**
 * Create and store a new download entry in the database.
 *
 * @async
 * @param {object} db - MongoDB database instance.
 * @param {string} requestedBy - The requester's identifier.
 * @param {object} file - The file uploaded via multer middleware.
 * @returns {object} A response object with details of the operation.
 * @throws {error} Throws an error if an error occurs.
 */
const createDownloadService = async (db,  requestedBy, file) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);;

        if (isValidRequester) {
            const result = await db.collection(DOWNLOAD_COLLECTION_NAME).insertOne({ filename: file.originalname + Date.now(), path: file.path });

            if (result?.acknowledged) {
                return {
                    data: result,
                    success: true,
                    status: StatusCodes.OK,
                    message: 'File uploaded successfully'
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: StatusCodes.UNPROCESSABLE_ENTITY,
                    message: 'Error while uploading file'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.UNAUTHORIZED,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieve a list of all download entries from the database.
 *
 * @async
 * @param {object} db - MongoDB database instance.
 * @returns {object} A response object with a list of files or error message.
 * @throws {error} Throws an error if an error occurs.
 */
const getDownloadListService = async (db) => {
    try {
        const classList = await db
            .collection(DOWNLOAD_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (classList?.length > 0) {
            return {
                data: classList,
                success: false,
                status: StatusCodes.OK,
                message: `${classList?.length} file found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.NOT_FOUND,
                message: 'No file found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieve a specific download entry based on its filename.
 *
 * @async
 * @param {object} db - MongoDB database instance.
 * @param {string} fileName - The name of the file to be retrieved.
 * @returns {object} A response object with file details or error message.
 * @throws {error} Throws an error if an error occurs.
 */
const getADownloadService = async (db, fileName) => {
    try {
        const file = await db.collection(DOWNLOAD_COLLECTION_NAME).findOne({ filename: fileName }, { projection: { _id: 0 } });

        if (file) {
            return {
                data: file,
                success: true,
                status: StatusCodes.OK,
                message: 'File fetched successfully'
            };
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.NOT_FOUND,
                message: 'File not found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Delete a specific download entry based on its filename.
 *
 * @async
 * @param {object} db - MongoDB database instance.
 * @param {string} requestedBy - The requester's identifier.
 * @param {string} fileName - The name of the file to be deleted.
 * @returns {object} A response object with details of the deletion operation.
 * @throws {error} Throws an error if an error occurs.
 */
const deleteADownloadService = async (db, requestedBy, fileName) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const result = await db.collection(DOWNLOAD_COLLECTION_NAME).deleteOne({ filename: fileName });

            if (result.deletedCount === 1) {
                // Also remove the file from the disk (using Node's fs module)
                const fs = require('fs');
                const path = require('path');
                fs.unlinkSync(path.join('uploads/', fileName));

                return {
                    data: {},
                    success: true,
                    status: StatusCodes.OK,
                    message: 'File deleted successfully'
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: StatusCodes.NOT_FOUND,
                    message: 'File not found'
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.UNAUTHORIZED,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

export const DownloadService = {
    createDownloadService,
    getDownloadListService,
    getADownloadService,
    deleteADownloadService
};
