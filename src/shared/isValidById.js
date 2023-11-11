/**
 * @fileoverview Validity Checker for Requester IDs in Specific Collections.
 *
 * This module provides a function to validate the existence of a given ID within a specified collection
 * in the database. It is a crucial utility for verifying the legitimacy of requesters or entities before
 * proceeding with various database operations. The function checks if the provided ID exists in the given
 * collection and returns a boolean value indicating the result. This verification step helps maintain
 * data integrity and secure access throughout the application.
 *
 * @requires DatabaseMiddleware - Middleware for database interactions.
 * @requires logger - Utility for logging errors.
 * @module isValidById - Exported function for checking ID validity in a specific collection.
 */

import logger from "./logger.js";

/**
 * Validates the existence of a given ID in a specified database collection.
 * This function is used to ascertain whether an entity identified by the given ID exists in the specified
 * collection. It queries the database collection with the provided ID and returns `true` if the ID is found,
 * or `false` otherwise. This check is essential in operations where verifying the existence of an entity is
 * critical before proceeding with further actions.
 *
 * @param {Object} db - The database connection object used to interact with the database.
 * @param {string} collectionName - The name of the collection in which the ID will be searched.
 * @param {string} requestedId - The ID to be validated.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the ID exists in the collection, or `false` otherwise.
 */
const isValidById = async (db, collectionName, requestedId) => {
    try {
        const requestedIdValidity = await db
            .collection(collectionName)
            .findOne({ id: requestedId });

        return !!requestedIdValidity;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default isValidById;
