/**
 * @fileoverview Utility function for deleting entries by file name from a database collection.
 *
 * This module provides a function to delete an entry from a specified database collection using a file name.
 * It abstracts the database deletion operation, making it reusable across different parts of the application
 * where deletion of records based on their file name is required. The function takes a database connection
 * object, the name of the collection, and the file name of the entry to be deleted. It then returns a promise
 * that resolves to a boolean indicating the success of the deletion operation. In case of errors during the
 * deletion process, they are logged using a shared logger utility.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module deleteByFileName - Function to delete an entry by file name from a database collection.
 */

import logger from "./logger.js";

/**
 * Delete the requester by looking up the file name in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param fileName
 * @returns {Promise<boolean>} Returns `true` if the file is deleted, otherwise `false`.
 */
const deleteByFileName= async (db, collectionName, fileName) => {
    try {
        const requesterValidity = await db
            .collection(collectionName)
            .deleteOne({ fileName: fileName });

        return !!requesterValidity;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default deleteByFileName;