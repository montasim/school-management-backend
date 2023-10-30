import {CLASS_COLLECTION_NAME} from "../config/config.js";

/**
 * Checks if a class with the given name already exists in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} name - The name of the class to check.
 * @returns {Promise<boolean>} Returns true if the class already exists, otherwise false.
 */
const isClassAlreadyExists = async (db, name) => {
    const isClassExists = await db
        .collection(CLASS_COLLECTION_NAME)
        .findOne({ name: name });

    return !!isClassExists;
};

export default isClassAlreadyExists;
