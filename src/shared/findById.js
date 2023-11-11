/**
 * @fileoverview Utility function for finding entries by ID in a database collection.
 *
 * This module exports a function that provides the capability to search for a specific
 * entry in a database collection using its ID. It is designed to abstract and standardize
 * the process of querying database collections based on an identifier. The function takes
 * a database connection object, the name of the collection, and the ID of the entry to be
 * found. It then returns a promise that resolves to the found entry, excluding some fields
 * for privacy or convenience. In case of errors during the search operation, they are logged
 * using a shared logger utility.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module findById - Function to find a database entry by ID in a specific collection.
 */

import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the requester id in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param id
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const findById = async (db, collectionName, id) => {
    try {
        if (!collectionName) {
            logger.error("COLLECTION_NAME is not defined");

            return false;
        }

        return await db
            .collection(collectionName)
            .findOne({id: id}, { projection: { _id: 0, createdBy: 0, modifiedBy: 0 } });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default findById;