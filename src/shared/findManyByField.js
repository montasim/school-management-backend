/**
 * @fileoverview Utility Function for Database Search by Field.
 *
 * This module exports a versatile function that simplifies searching for documents in a MongoDB collection based on a specific field.
 * It provides a streamlined way to query a database collection using any field and its corresponding value,
 * enhancing flexibility and re-usability across different parts of the application. The function excludes certain fields
 * from the returned documents for privacy and data minimization. Any errors encountered during the search operation are logged
 * for debugging and monitoring purposes.
 *
 * @requires logger - Shared logging utility for error handling and logging.
 * @module findByField - Centralized function for database queries based on a given field.
 */

import logger from "./logger.js";

/**
 * Finds and returns a document from a specified collection based on a given field and its value.
 *
 * @async
 * @function findByField
 * @param {object} db - The database connection object.
 * @param {string} collectionName - The name of the collection to search within.
 * @param {string} field - The field to search by (e.g., 'id', 'fileName').
 * @param {string} fieldValue - The value of the field to match.
 * @returns {Promise<Object|null>} A promise that resolves to the found document or null if not found or in case of an error.
 * @description Searches a MongoDB collection for a document where the specified field matches the given value.
 *              The search is performed efficiently and excludes certain fields from the result for privacy.
 *              Errors are logged using the logger utility.
 */
const findManyByField = async (db, collectionName, field, fieldValue) => {
    try {
        // Validate the input parameters
        if (!collectionName || !field || fieldValue === undefined || fieldValue === null) {
            logger.error(`Invalid parameters for findManyByField: collectionName=${collectionName}, field=${field}, fieldValue=${fieldValue}`);

            return null;
        }

        // Construct the query based on the field and its value
        let query = {};
        query[field] = fieldValue;

        // Execute the query and return the result, excluding certain fields
        return await db?.collection(collectionName)?.find(query, {
            projection: {
                _id: 0,
                createdBy: 0,
                modifiedBy: 0
            }
        }).toArray();
    } catch (error) {
        logger.error(`Error in findManyByField: ${error}`);

        return null;
    }
};

export default findManyByField;