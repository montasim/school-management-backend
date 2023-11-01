import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the requester id in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param id
 * @returns {Promise<boolean>} Returns `details` if the requester is valid.
 */
const findById = async (db, collectionName, id) => {
    try {
        return await db
            .collection(collectionName)
            .findOne({id: id}, { projection: { _id: 0, createdBy: 0, modifiedBy: 0 } });
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

export default findById;
