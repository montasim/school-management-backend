/**
 * @fileoverview Utility function for finding entries by file name in a database collection.
 *
 * This module exports a function that provides the capability to search for a specific
 * entry in a database collection using its file name. It is designed to abstract and
 * standardize the process of querying database collections based on a file name. The function
 * takes a database connection object, the name of the collection, and the file name of the entry
 * to be found. It then returns a promise that resolves to the found entry, excluding some fields
 * for privacy or convenience. In case of errors during the search operation, they are logged
 * using a shared logger utility.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module findByFileName - Function to find a database entry by file name in a specific collection.
 */

import logger from "./logger.js";

/**
 * Check if the file name is valid by looking up the requester id in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param fileName
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const findByFileName = async (db, collectionName, fileName) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({fileName: fileName}, { projection: { _id: 0, createdBy: 0, modifiedBy: 0 } });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default findByFileName;