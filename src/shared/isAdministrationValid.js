import {ADMINISTRATION_COLLECTION_NAME} from "../config/config.js";

/**
 * Check if the requester is valid by looking up the requester's ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} administrationId - The ID of the administration to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isAdministrationValid = async (db, administrationId) => {
    const requestedAdministrationValidity = await db
        .collection(ADMINISTRATION_COLLECTION_NAME)
        .findOne({ id: administrationId });

    return !!requestedAdministrationValidity;
};

export default isAdministrationValid;
