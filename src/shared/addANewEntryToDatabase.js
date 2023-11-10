/**
 * @fileoverview Utility function for adding new entries to a database collection.
 *
 * This module provides a function to add new entries to a specified collection in the database.
 * It is designed to abstract the database insertion logic, making it reusable across different parts
 * of the application. The function takes a database connection object, the name of the collection,
 * and the details of the entry to be added. It returns a promise that resolves to the result of the
 * insertion operation. Errors during the insertion process are logged using a shared logger utility.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module addANewEntryToDatabase - Function to add new entries to a database collection.
 */

import logger from "./logger.js";

/**
 * Add a new entry in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param details
 * @returns {Promise<boolean>} Returns `details` of the added entry.
 */
const addANewEntryToDatabase = async (db, collectionName, details) => {
    try {
        return await db
            .collection(collectionName)
            .insertOne(details);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default addANewEntryToDatabase;
