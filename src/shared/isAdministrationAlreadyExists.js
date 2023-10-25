import {ADMINISTRATION_COLLECTION_NAME} from "../constants/index.js";

/**
 * Checks if a administration with the given name already exists in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} name - The name of the administration to check.
 * @returns {Promise<boolean>} Returns true if the administration already exists, otherwise false.
 */
const isAdministrationAlreadyExists = async (db, name) => {
    const isAdministrationExists = await db
        .collection(ADMINISTRATION_COLLECTION_NAME)
        .findOne({ name: name });

    return !!isAdministrationExists;
};

export default isAdministrationAlreadyExists;
