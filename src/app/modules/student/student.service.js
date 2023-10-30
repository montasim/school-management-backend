import { v4 as uuidv4 } from 'uuid';
import { STUDENT_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./student.constants.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isStudentValid from "../../../shared/isStudentValid.js";
import logger from "../../middlewares/logger.js";

/**
 * Generates a standardized response object for service functions.
 *
 * @param {Object} data - The data to return.
 * @param {boolean} success - Indication if the operation was successful.
 * @param {number} status - The HTTP status code.
 * @param {string} message - A descriptive message about the response.
 * @returns {Object} - The standardized response object.
 */
const generateResponse = (data, success, status, message) => ({ data, success, status, message });

const insertStudent = async (db, studentDetails) =>
    db.collection(STUDENT_COLLECTION_NAME).insertOne(studentDetails);

const findStudent = async (db, studentId) =>
    db.collection(STUDENT_COLLECTION_NAME).findOne({ id: studentId }, { projection: { _id: 0 } });

const findAllStudents = async (db) =>
    db.collection(STUDENT_COLLECTION_NAME).find({}, { projection: { _id: 0 } }).toArray();

const updateStudent = async (db, studentId, updatedStudent) =>
    db.collection(STUDENT_COLLECTION_NAME).updateOne({ id: studentId }, { $set: updatedStudent });

const deleteStudent = async (db, studentId) =>
    db.collection(STUDENT_COLLECTION_NAME).deleteOne({ id: studentId });

/**
 * Creates a new student entry in the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {Object} newStudentDetails - New student's details.
 * @returns {Object} - The response after attempting student creation.
 * @throws {Error} Throws an error if any.
 */
const createStudentService = async (db, newStudentDetails) => {
    try {
        const { name, level, image, requestedBy } = newStudentDetails;

        if (!await isRequesterValid(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        const studentDetails = {
            id: `${ID_CONSTANTS?.STUDENT_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            level,
            image,
            createdBy: requestedBy,
            createdAt: new Date(),
        };

        const result = await insertStudent(db, studentDetails);

        return result?.acknowledged
            ? generateResponse(studentDetails, true, 200, `${studentDetails.name} created successfully`)
            : generateResponse({}, false, 500, 'Failed to create. Please try again');

    } catch (error) {
        logger.error(error);

        throw error;
    }
};


/**
 * Retrieves a list of all students from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @returns {Object} - The list of students or an error message.
 * @throws {Error} Throws an error if any.
 */
const getStudentListService = async (db) => {
    try {
        const students = await findAllStudents(db);
        return students?.length
            ? generateResponse(students, true, 200, `${students.length} student found`)
            : generateResponse({}, false, 404, 'No student found');
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific student by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} studentId - The ID of the student to retrieve.
 * @returns {Object} - The student details or an error message.
 * @throws {Error} Throws an error if any.
 */
const getAStudentService = async (db, studentId) => {
    try {
        const student = await findStudent(db, studentId);
        return student
            ? generateResponse(student, true, 200, `${studentId} found successfully`)
            : generateResponse({}, false, 404, `${studentId} not found`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Retrieves a specific student by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} studentId - The ID of the student to retrieve.
 * @param newStudentDetails
 * @returns {Object} - The student details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAStudentService = async (db, studentId, newStudentDetails) => {
    try {
        const { name, level, image, requestedBy } = newStudentDetails;

        if (!await isRequesterValid(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        const updatedStudent = {
            ...(name && { name }),
            ...(level && { level }),
            ...(image && { image }),
            modifiedBy: requestedBy,
            modifiedAt: new Date(),
        };

        const result = await updateStudent(db, studentId, updatedStudent);
        const updatedData = await findStudent(db, studentId);

        return result?.modifiedCount
            ? generateResponse(updatedData, true, 200, `${studentId} updated successfully`)
            : generateResponse({}, false, 422, `${studentId} not updated`);

    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * Deletes a specific student by ID from the database.
 *
 * @async
 * @param {Object} db - Database connection object.
 * @param {string} requestedBy - The user ID making the request.
 * @param {string} studentId - The ID of the student to delete.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteAStudentService = async (db, requestedBy, studentId) => {
    try {
        if (!await isRequesterValid(db, requestedBy))
            return generateResponse({}, false, 403, FORBIDDEN_MESSAGE);

        if (!await isStudentValid(db, studentId))
            return generateResponse({}, false, 404, `${studentId} not found`);

        const result = await deleteStudent(db, studentId);

        return result?.deletedCount === 1
            ? generateResponse({}, true, 200, `${studentId} deleted successfully`)
            : generateResponse({}, false, 422, `${studentId} could not be deleted`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace StudentService
 * @description Group of services related to student operations.
 */
export const StudentService = {
    createStudentService,
    getStudentListService,
    getAStudentService,
    updateAStudentService,
    deleteAStudentService
};
