import {STUDENT_COLLECTION_NAME} from "../constants/index.js";

/**
 * Check if the requester is valid by looking up the requester's ID in the admin collection.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} studentId - The ID of the student to be validated.
 * @returns {Promise<boolean>} Returns `true` if the requester is valid, otherwise `false`.
 */
const isStudentValid = async (db, studentId) => {
    const requestedStudentValidity = await db
        .collection(STUDENT_COLLECTION_NAME)
        .findOne({ id: studentId });

    return !!requestedStudentValidity;
};

export default isStudentValid;
