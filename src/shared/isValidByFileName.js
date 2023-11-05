import logger from "./logger.js";

/**
 * Check if the requester is valid by looking up the file name in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param collectionName
 * @param {string} fileName - The file name to be validated.
 * @returns {Promise<boolean>} Returns `true` if the file name is valid, otherwise `false`.
 */
const isValidByFileName = async (db, collectionName, fileName) => {
    try {
        const requestedIdValidity = await db
            .collection(collectionName)
            .findOne({ fileName: fileName });

        return !!requestedIdValidity;
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default isValidByFileName;
