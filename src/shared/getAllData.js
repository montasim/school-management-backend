import logger from "./logger.js";

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
            .find({}, { projection: { _id: 0, createdBy: 0, modifiedBy: 0, googleDriveFileId: 0 }}).toArray();
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default getAllData;
