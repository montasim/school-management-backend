import { v4 as uuidv4 } from 'uuid';
import { STUDENT_COLLECTION_NAME } from "../../../config/config.js";
import { FORBIDDEN_MESSAGE } from "../../../constants/constants.js";
import { ID_CONSTANTS } from "./student.constants.js";
import isValidRequest from "../../../shared/isValidRequest.js";
import isValidById from "../../../shared/isValidById.js";
import generateResponseData from "../../../helpers/generateResponseData.js";
import logger from "../../middlewares/logger.js";
import addANewEntryToDatabase from "../../../shared/addANewEntryToDatabase.js";
import findById from "../../../shared/findById.js";
import getAllData from "../../../shared/getAllData.js";
import updateById from "../../../shared/updateById.js";
import deleteById from "../../../shared/deleteById.js";

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

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const studentDetails = {
            id: `${ID_CONSTANTS?.STUDENT_PREFIX}-${uuidv4().substr(0, 6)}`,
            name,
            level,
            image,
            createdBy: requestedBy,
            createdAt: new Date(),
        };
        const result = await addANewEntryToDatabase(db, STUDENT_COLLECTION_NAME, studentDetails);
        const latestData = await findById(db, STUDENT_COLLECTION_NAME, studentDetails?.id);

        return result?.acknowledged
            ? generateResponseData(latestData, true, 200, `${studentDetails.name} created successfully`)
            : generateResponseData({}, false, 500, 'Failed to create. Please try again');

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
        const students = await getAllData(db, STUDENT_COLLECTION_NAME);

        return students?.length
            ? generateResponseData(students, true, 200, `${students?.length} student found`)
            : generateResponseData({}, false, 404, 'No student found');
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
        const student = await findById(db, STUDENT_COLLECTION_NAME, studentId);

        return student
            ? generateResponseData(student, true, 200, `${studentId} found successfully`)
            : generateResponseData({}, false, 404, `${studentId} not found`);
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
 * @param updateStudentDetails
 * @returns {Object} - The student details or an error message.
 * @throws {Error} Throws an error if any.
 */
const updateAStudentService = async (db, studentId, updateStudentDetails) => {
    try {
        const { name, level, image, requestedBy } = updateStudentDetails;

        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        const updatedStudent = {
            ...(name && { name }),
            ...(level && { level }),
            ...(image && { image }),
            modifiedBy: requestedBy,
            modifiedAt: new Date(),
        };
        const result = await updateById(db, STUDENT_COLLECTION_NAME, studentId, updatedStudent);
        const latestData = await findById(db, STUDENT_COLLECTION_NAME, studentId);

        return result?.modifiedCount
            ? generateResponseData(latestData, true, 200, `${studentId} updated successfully`)
            : generateResponseData({}, false, 422, `${studentId} not updated`);

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
        if (!await isValidRequest(db, requestedBy))
            return generateResponseData({}, false, 403, FORBIDDEN_MESSAGE);

        if (!await isValidById(db, STUDENT_COLLECTION_NAME, studentId))
            return generateResponseData({}, false, 404, `${studentId} not found`);

        const result = await deleteById(db, STUDENT_COLLECTION_NAME, studentId);

        return result
            ? generateResponseData({}, true, 200, `${studentId} deleted successfully`)
            : generateResponseData({}, false, 422, `${studentId} could not be deleted`);
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
