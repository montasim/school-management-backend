import {CLASS_COLLECTION_NAME} from "../constants/index.js";

/**
 * Check if the requester is valid by looking up the requester's ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} classId - The ID of the class to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isClassValid = async (db, classId) => {
    const requestedClassValidity = await db
        .collection(CLASS_COLLECTION_NAME)
        .findOne({ id: classId });

    return !!requestedClassValidity;
};

export default isClassValid;
