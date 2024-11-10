/**
 * @fileoverview Database Update Utility for Specific IDs in Collections.
 *
 * This module provides a function for updating database records based on a given ID within a specified collection.
 * It is designed to handle updates to various entities within different collections in a uniform and efficient manner.
 * The function receives the target collection's name, the ID of the entity to be updated, and the new details for the update.
 * It then applies these updates to the appropriate database record. This utility is crucial for maintaining up-to-date
 * and accurate information across the application's database.
 *
 * @requires DatabaseMiddleware - Middleware for database interactions.
 * @requires logger - Utility for logging errors.
 * @module updateById - Exported function for updating records in a collection by ID.
 */

import logger from "./logger.js";
import prisma from "./prisma.js";

/**
 * Updates a specific record in a database collection based on an ID.
 * This function is integral for modifying data of a particular record identified by its ID within a specified collection.
 * It takes the ID of the record, the name of the collection where the record resides, and the new details to be updated.
 * The function then executes an update operation on the database, ensuring the specified record reflects the provided changes.
 * This utility is key for dynamic data management within the application's database structure.
 *
 * @param {Object} db - The database connection object, used for executing database operations.
 * @param {string} collectionName - The name of the collection containing the record to update.
 * @param {string} id - The ID of the record to be updated.
 * @param {Object} details - An object containing the updated details for the record.
 * @returns {Promise<Object>} A promise that resolves with the result of the update operation.
 */
const updateById = async (db, collectionName, id, details) => {
    try {
        if (!collectionName) {
            logger.error("Model name is not defined");
            return false;
        }

        // Execute the update operation
        const updatedRecord = await prisma[collectionName].update({
            where: { id: id },
            data: details,
        });

        return updatedRecord;
    } catch (error) {
        logger.error(error);
        return error;
    }
};


export default updateById;