import logger from "./logger.js";

/**
 * Update the requester details in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param id
 * @param details
 * @returns {Promise<boolean>} Returns the updated details.
 */
const updateById = async (db, collectionName, id, details) => {
    try {
        if (!collectionName) {
            logger.error("COLLECTION_NAME is not defined");

            return false;
        }

        return await db
            .collection(collectionName)
            .updateOne({ id: id }, { $set: details });
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default updateById;
