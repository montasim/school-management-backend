import logger from "../app/middlewares/logger.js";

/**
 * Get all the data from the collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @returns {Promise<boolean>} Returns all the data from the collection.
 */
const getAllData = async (db, collectionName) => {
    try {
        return await db
            .collection(collectionName)
            .find({}, { projection: { _id: 0 }}).toArray();
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

export default getAllData;
