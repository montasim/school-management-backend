import {STUDENT_COLLECTION_NAME} from "../config/config.js";

/**
 * Checks if a student with the given name already exists in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} name - The name of the student to check.
 * @returns {Promise<boolean>} Returns true if the student already exists, otherwise false.
 */
const isStudentAlreadyExists = async (db, name) => {
    const isStudentExists = await db
        .collection(STUDENT_COLLECTION_NAME)
        .findOne({ name: name });

    return !!isStudentExists;
};

export default isStudentAlreadyExists;
