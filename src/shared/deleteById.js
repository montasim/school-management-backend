import logger from "./logger.js";

/**
 * Delete the requester by looking up the requester ID in the collection.
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
        logger.error(error);

        return error;
    }
};

export default deleteById;
