import logger from "./logger.js";

/**
 * Check if the file name is valid by looking up the requester id in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param fileName
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const findByFileName = async (db, collectionName, fileName) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({fileName: fileName}, { projection: { _id: 0, createdBy: 0 } });
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

export default findByFileName;
