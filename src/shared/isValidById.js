import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the requester ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param {string} requestedId - The ID of the administration to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
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
