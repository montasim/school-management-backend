/**
 * @fileoverview Database Record Existence Check Utility
 *
 * This utility module provides a function for checking the existence of a record in a database collection based on a given name.
 * It is designed to query a specified collection to determine if an entry with the requested name already exists. This function is
 * particularly useful in scenarios where duplicate entries are to be avoided, such as in the creation of uniquely named levels or categories.
 * The module employs a shared logger for error logging.
 *
 * @module isAlreadyExistsByName
 */

import logger from "./logger.js";

/**
 * Checks for the existence of a record by name in a database collection.
 *
 * This asynchronous function queries a specified collection in the database for a record with the given name.
 * It is used to prevent duplicate entries in the database by verifying if a record with the same name already exists.
 * The function returns true if such a record is found, otherwise false. Errors encountered during the database query are logged.
 *
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} collectionName - The name of the collection to query.
 * @param {string} requestedName - The name to check for in the collection.
 * @returns {Promise<boolean>} A promise that resolves to true if a record with the given name exists, otherwise false.
 */
const isAlreadyExistsByName = async (db, collectionName, requestedName) => {
    try {
        const isClassExists = await db
            .collection(collectionName)
            .findOne({ name: requestedName });

        return !!isClassExists;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default isAlreadyExistsByName;
