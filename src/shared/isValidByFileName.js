/**
 * @fileoverview File Name Validation Utility
 *
 * This utility module provides a function to validate the existence of a file name within a specific collection in the database.
 * It is designed to query a given collection to check if a record with the specified file name exists. This can be useful in various
 * scenarios, such as verifying the legitimacy of file access requests, or ensuring the uniqueness of file names in the system. The module
 * employs a shared logger for logging errors encountered during the database query process.
 *
 * @module isValidByFileName
 */

import logger from "./logger.js";

/**
 * Validates the existence of a file name in a database collection.
 *
 * This asynchronous function checks if a given file name exists in a specified collection of the database. It queries the collection
 * for a record matching the provided file name and returns a boolean indicating the result of this query. The function is useful in
 * validating file names for various operations like file upload, access control, etc. Errors encountered during the operation are logged.
 *
 * @async
 * @param {object} db - The database connection object.
 * @param {string} collectionName - The name of the collection to query.
 * @param {string} fileName - The file name to validate.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the file name exists in the collection, otherwise `false`.
 */
const isValidByFileName = async (db, collectionName, fileName) => {
    try {
        const requestedIdValidity = await db
            .collection(collectionName)
            .findOne({ fileName: fileName });

        return !!requestedIdValidity;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default isValidByFileName;
