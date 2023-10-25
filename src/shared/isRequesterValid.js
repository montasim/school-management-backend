import {ADMIN_COLLECTION_NAME} from "../constants/index.js";

/**
 * Check if the requester is valid by looking up the requester's ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} requestedBy - The ID of the requester to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isRequesterValid = async (db, requestedBy) => {
    const requesterValidity = await db
        .collection(ADMIN_COLLECTION_NAME)
        .findOne({ id: requestedBy });

    return !!requesterValidity;
};

export default isRequesterValid;
