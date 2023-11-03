import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the requester userName in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param userName
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const findByUserName = async (db, collectionName, userName) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({userName: userName}, { projection: { _id: 0 } });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default findByUserName;
