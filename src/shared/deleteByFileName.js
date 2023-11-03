import logger from "./logger.js";

/**
 * Delete the requester by looking up the file name in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param fileName
 * @returns {Promise<boolean>} Returns `true` if the file is deleted, otherwise `false`.
 */
const deleteByFileName= async (db, collectionName, fileName) => {
    try {
        const requesterValidity = await db
            .collection(collectionName)
            .deleteOne({ fileName: fileName });

        return !!requesterValidity;
    } catch (error) {
        // Log the error using the logger
        logger.error(error);

        // Propagate the error to the calling function
        throw error;
    }
};

export default deleteByFileName;
