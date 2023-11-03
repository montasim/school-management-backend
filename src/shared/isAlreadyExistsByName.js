import logger from "./logger.js";

/**
 * Checks if a level with the given name already exists in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param collectionName
 * @param {string} requestedName - The name of the level to check.
 * @returns {Promise<boolean>} Returns true if the level already exists, otherwise false.
 */
const isAlreadyExistsByName = async (db, collectionName, requestedName) => {
    try {
        const isClassExists = await db
            .collection(collectionName)
            .findOne({ name: requestedName });

        return !!isClassExists;
    } catch (error) {
        // Log the error using the logger
        logger.error(error);

        // Propagate the error to the calling function
        throw error;
    }
};

export default isAlreadyExistsByName;
