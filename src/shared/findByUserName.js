import logger from "../app/middlewares/logger.js";

/**
 * Check if the requester is valid by looking up the requester's userName in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param userName
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const isValidRequest = async (db, collectionName, userName) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({userName: userName});
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

export default isValidRequest;
