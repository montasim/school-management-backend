/**
 * @fileoverview Database Deletion Utility for Specific IDs in Collections.
 *
 * This module provides a function for deleting database records based on a given ID within a specified collection.
 * It is designed to facilitate the removal of specific entities from various collections in a consistent and reliable manner.
 * The function accepts the name of the target collection and the ID of the entity to be deleted, then executes the deletion
 * operation in the database. This utility plays a crucial role in managing the lifecycle of data within the application's database,
 * allowing for the efficient removal of outdated or unnecessary records.
 *
 * @requires DatabaseMiddleware - Middleware for database interactions.
 * @requires logger - Utility for logging errors.
 * @module deleteById - Exported function for deleting records in a collection by ID.
 */

import logger from "./logger.js";

/**
 * Deletes a specific record from a database collection based on an ID.
 * This function is essential for removing a particular record identified by its ID from a given collection.
 * It takes the collection's name and the ID of the record to be deleted. The function then carries out a delete operation
 * on the database, ensuring that the specified record is removed efficiently. This utility is vital for data integrity and
 * maintenance within the application's database, as it allows for the timely and effective elimination of unnecessary or obsolete data.
 *
 * @param {Object} db - The database connection object, used for executing database operations.
 * @param {string} collectionName - The name of the collection from which the record is to be deleted.
 * @param {string} requestedId - The ID of the record to be deleted.
 * @returns {Promise<boolean>} A promise that resolves with the outcome of the delete operation.
 */
const deleteById = async (db, collectionName, requestedId) => {
    try {
        const requesterValidity = await db
            .collection(collectionName)
            .deleteOne({ id: requestedId });

        return !!requesterValidity;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default deleteById;