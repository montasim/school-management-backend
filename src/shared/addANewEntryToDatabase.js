import logger from "../app/middlewares/logger.js";

/**
 * Add a new entry in the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param details
 * @returns {Promise<boolean>} Returns `details` of the added entry.
 */
const addANewEntryToDatabase = async (db, collectionName, details) => {
    try {
        return await db
            .collection(collectionName)
            .insertOne(details);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

export default addANewEntryToDatabase;
