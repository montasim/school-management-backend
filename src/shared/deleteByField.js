/**
 * @fileoverview Utility Function for Deleting Documents from a Database Collection.
 *
 * This module provides a generalized function to delete documents from a specified MongoDB collection
 * based on a given field and value. This utility function offers a more flexible approach to deleting documents,
 * allowing it to be used across different scenarios where deletion criteria may vary.
 * Errors encountered during the deletion process are logged for troubleshooting.
 *
 * @requires logger - Shared logging utility for error logging.
 * @module deleteByField - Function to delete a database entry by a specified field in a collection.
 */

import logger from "./logger.js";

/**
 * Deletes a document from a specified collection based on a given field and its value.
 *
 * @async
 * @function deleteByField
 * @param {object} db - The database connection object.
 * @param {string} collectionName - The name of the collection to perform the deletion.
 * @param {string} field - The field to base the deletion on (e.g., 'id', 'fileName').
 * @param {string} fieldValue - The value of the field to match for deletion.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the deletion was successful, `false` otherwise.
 * @description Deletes a document from the specified collection where the given field matches the provided value.
 *              If any errors occur during the operation, they are logged and the function returns `false`.
 */
const deleteByField = async (db, collectionName, field, fieldValue) => {
    try {
        if (!collectionName || !field || !fieldValue) {
            logger.warn(`Invalid parameters for deleteByField: collectionName=${collectionName}, field=${field}, fieldValue=${fieldValue}`);
            return false;
        }

        // Construct the deletion query based on the field and its value
        let query = {};
        query[field] = fieldValue;

        // Perform the deletion
        const result = await db.collection(collectionName).deleteOne(query);

        // Return true if the deletion was acknowledged and at least one document was deleted
        return result.acknowledged && result.deletedCount > 0;
    } catch (error) {
        logger.error(`Error deleting document by ${field} in ${collectionName}:`, error);
        return false;
    }
};

export default deleteByField;
