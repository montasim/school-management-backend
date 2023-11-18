/**
 * @fileoverview User Lookup Utility
 *
 * This utility module provides a function for checking the validity of a requester by looking up their userName in a specified collection in the database.
 * It uses a database connection object to query a collection for a user with the given userName. The function is designed to return the user's details
 * if found, which can be used to verify the validity of the requester. This module is useful for authentication and authorization processes in the
 * application. It includes error handling, which logs any issues that occur during the database query process.
 *
 * @module findByUserName
 */

import logger from "./logger.js";

/**
 * Finds a user by userName in a specified database collection.
 *
 * This asynchronous function queries a given collection in the database for a user with the specified userName.
 * It returns the details of the user if found, or `null` if no matching user is found. This is useful in validating
 * the existence and details of a user based on their userName, typically for authentication or data retrieval purposes.
 * Errors encountered during the database operation are logged.
 *
 * @async
 * @param {object} db - The database connection object.
 * @param {string} collectionName - The name of the collection to query.
 * @param {string} userName - The userName to search for in the collection.
 * @returns {Promise<object|null>} A promise that resolves to the user's details if found, or `null` if not found.
 */
const findByUserName = async (db, collectionName, userName) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({userName: userName}, { projection: { _id: 0 } });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default findByUserName;