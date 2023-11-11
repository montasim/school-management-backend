/**
 * @fileoverview Utility function for retrieving all entries from a database collection.
 *
 * This module exports a function that queries a given database collection and retrieves all
 * the entries within it. The function is designed to abstract the process of querying entire
 * collections from the database, making it reusable across different parts of the application.
 * It takes a database connection object and the name of the collection as parameters. The
 * retrieved entries exclude certain fields, such as IDs and creator information, for privacy
 * or convenience. In the event of an error during the database operation, it is logged using
 * a shared logging utility.
 *
 * @requires logger - Shared logging utility for error handling.
 * @module getAllData - Function to retrieve all entries from a specific database collection.
 */

import logger from "./logger.js";

/**
 * Get all the data from the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @returns {Promise<boolean>} Returns all the data from the collection.
 */
const getAllData = async (db, collectionName) => {
    try {
        if (!collectionName) {
            logger.error("COLLECTION_NAME is not defined");

            return false;
        }

        return await db
            .collection(collectionName)
            .find({}, { projection: { _id: 0, createdBy: 0, modifiedBy: 0, googleDriveFileId: 0, googleDriveLogoId: 0, googleDriveFavIconId: 0 }}).toArray();
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default getAllData;