/**
 * @fileoverview This module provides a utility function to update a specific field across
 * multiple documents in a MongoDB collection. It is designed to handle both array and
 * string fields by applying a specified update logic to each document.
 * The function leverages the `updateById` utility to apply these updates.
 */

import logger from "./logger.js";
import updateById from "./updateById.js";

/**
 * Updates a specific field in a collection for multiple documents. This function is
 * flexible and can handle both array and string fields. It applies a provided update
 * logic to each element of the field if it's an array, or directly to the field if it's
 * a string. It logs warnings for documents where the field is neither an array nor a string.
 *
 * @param {Object} db - The database connection.
 * @param {String} collectionName - The name of the MongoDB collection to update.
 * @param {Array} documentsToUpdate - An array of documents (objects) to be updated. Each document must contain the field to be updated.
 * @param {String} fieldName - The name of the field in each document that needs to be updated.
 * @param {Function} updateLogic - A function defining the logic for updating the field's value. This function takes the current field value as a parameter and should return the updated value.
 * @throws Will log an error if an exception occurs during the update process.
 */
const updateFieldForMultipleDocuments = async (db, collectionName, documentsToUpdate, fieldName, updateLogic) => {
    try {
        // Validate the input parameters
        if (!collectionName || !documentsToUpdate || !fieldName || !updateLogic) {
            logger.error(`Invalid parameters for findManyByField: collectionName=${collectionName}, documentsToUpdate=${documentsToUpdate}, fieldName=${fieldName}, updateLogic=${updateLogic}`);

            return null;
        }

        for (const document of documentsToUpdate) {
            let updatedField;

            // Check if the field is an array or a string and apply the update logic accordingly
            if (Array.isArray(document[fieldName])) {
                updatedField = document[fieldName].map(item => updateLogic(item));
            } else if (typeof document[fieldName] === 'string') {
                updatedField = updateLogic(document[fieldName]);
            } else {
                // Log a warning for fields that are neither array nor string
                logger.warn(`Field ${fieldName} in document with id ${document.id} is neither an array nor a string`);

                continue; // Skip to the next document
            }

            // Update the document in the database
            await updateById(db, collectionName, document.id, { [fieldName]: updatedField });
        }
    } catch (error) {
        logger.error(`Error updating ${fieldName} in ${collectionName}: ${error}`);
    }
};

export default updateFieldForMultipleDocuments;