import logger from "./logger.js";

/**
 * Delete the requester by looking up the requester's ID in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param requestedId
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const deleteById = async (db, collectionName, requestedId) => {
    try {
        const requesterValidity = await db
            .collection(collectionName)
            .deleteOne({ id: requestedId });

        return !!requesterValidity;
    } catch (error) {
        // Log the error using the logger
        logger.error(error);

        // Propagate the error to the calling function
        throw error;
    }
};

export default deleteById;
