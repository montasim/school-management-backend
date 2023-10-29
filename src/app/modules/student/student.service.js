import { v4 as uuidv4 } from 'uuid';
import { STUDENT_COLLECTION_NAME } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isStudentAlreadyExists from "../../../shared/isStudentAlreadyExists.js";
import isStudentValid from "../../../shared/isStudentValid.js";

/**
 * Creates a new student in the database after performing necessary checks.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {Object} newStudentDetails - Details of the student to be created.
 * @param {string} newStudentDetails.name - The name of the student.
 * @param {string} newStudentDetails.requestedBy - The requester's identifier.
 * @returns {Promise<Object>} The result of the student creation.
 * @returns {Object} result.data - Data associated with the operation.
 * @returns {boolean} result.success - Whether the operation was successful.
 * @returns {number} result.status - HTTP status code representing the outcome.
 * @returns {string} result.message - Message describing the outcome.
 * @throws Will throw an error if any error occurs during the execution.
 */
const createStudentService = async (db,  newStudentDetails) => {
    try {
        const {
            name,
            level,
            image,
            requestedBy
        } = newStudentDetails;
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
                const prepareNewStudentDetails = {
                    id: `student-${uuidv4().substr(0, 6)}`,
                    name: name,
                    level: level,
                    image: image,
                    createdBy: requestedBy,
                    createdAt: new Date(),
                };

                const createNewStudentResult = await db
                    .collection(STUDENT_COLLECTION_NAME)
                    .insertOne(prepareNewStudentDetails);

                if (createNewStudentResult?.acknowledged) {
                    delete prepareNewStudentDetails?._id;

                    return {
                        data: prepareNewStudentDetails,
                        success: true,
                        status: 200,
                        message: `${prepareNewStudentDetails?.name} created successfully`
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 500,
                        message: 'Failed to create'
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 403,
                    message: 'You do not have necessary permission'
                };
            }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a list of categories from the database.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @returns {Promise<object>} - Returns an object containing the following properties:
 *  - data {Array<object>|object} - The list of categories if found, otherwise an empty object.
 *  - success {boolean} - Indicates if the operation was successful.
 *  - status {StatusCodes} - The HTTP status code.
 *  - message {string} - A message describing the result.
 * @throws {Error} - Throws an error if any issue occurs while fetching categories from the database.
 */
const getStudentListService = async (db) => {
    try {
        const studentList = await db
            .collection(STUDENT_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (studentList?.length > 0) {
            return {
                data: studentList,
                success: true,
                status: 200,
                message: `${studentList?.length} student found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: 'No student found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a specific student by its ID from the database.
 *
 * @function
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} studentId - The ID of the student to be fetched.
 *
 * @returns {Promise<Object>} The result object.
 * @returns {Object} result.data - The found student data or an empty object if not found.
 * @returns {boolean} result.success - Indicates whether the operation was successful.
 * @returns {number} result.status - The HTTP status code.
 * @returns {string} result.message - The message indicating the result of the operation.
 *
 * @throws {Error} Throws an error if there is any issue with the database operation.
 */
const getAStudentService = async (db, studentId) => {
    try {
        const foundStudent = await db
            .collection(STUDENT_COLLECTION_NAME)
            .findOne({ id: studentId }, { projection: { _id: 0 } });

        if (foundStudent) {
            return {
                data: foundStudent,
                success: true,
                status: 200,
                message: `${studentId} found successfully`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: `${studentId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service to update a student in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} studentId - The ID of the student to be updated.
 * @param {Object} newStudentDetails - The new details for the student.
 * @param {string} [newStudentDetails.name] - The new name for the student (optional).
 * @param {string} newStudentDetails.requestedBy - The ID of the user making the request.
 *
 * @returns {Promise<Object>} The result object containing:
 * - `data`: The updated student details (if updated successfully).
 * - `success`: A boolean indicating if the update operation was successful.
 * - `status`: The HTTP status code for the operation.
 * - `message`: A message indicating the result of the operation.
 *
 * @throws {Error} If there's any error during the update operation.
 */
const updateAStudentService = async (db, studentId, newStudentDetails) => {
    try {
        const foundStudent = await db
            .collection(STUDENT_COLLECTION_NAME)
            .findOne({ id: studentId }, { projection: { _id: 0 } });

        if (foundStudent) {
            const {
                name,
                level,
                image,
                requestedBy
            } = newStudentDetails;
            const updatedStudentDetails = {
                id: foundStudent?.id,
                ...(name && { name }),
                ...(level && { level }),
                ...(image && { image }),
                createdBy: foundStudent?.createdBy,
                createdAt: foundStudent?.createdAt,
                modifiedBy: requestedBy,
                modifiedAt: new Date(),
            };
            const updateSuperAdminDataResult = await db
                .collection(STUDENT_COLLECTION_NAME)
                .updateOne(
                    { id: studentId },
                    { $set: updatedStudentDetails },
                );

            if (updateSuperAdminDataResult?.modifiedCount > 0) {
                const updatedData = await db
                    .collection(STUDENT_COLLECTION_NAME)
                    .findOne({ id: studentId });

                delete updatedData._id;

                return {
                    data: updatedData,
                    success: true,
                    status: 200,
                    message: `${studentId} updated successfully`
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: 422,
                    message: `${studentId} not updated`
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: `${studentId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service for deleting a student.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} requestedBy - The requester's identifier.
 * @param {string} studentId - The ID of the student to delete.
 * @returns {Promise<Object>} An object containing the result of the delete operation.
 * @throws {Error} Throws an error if an issue arises during the delete process.
 *
 * @example
 *
 * const response = await deleteAStudentService(dbInstance, 'userId123', 'studentId456');
 * console.log(response.message); // Outputs: 'studentId456 deleted successfully'
 */
const deleteAStudentService = async (db, requestedBy, studentId) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const isStudentExists = await isStudentValid(db, studentId);

            if (isStudentExists) {
                const deleteResult = await db
                    .collection(STUDENT_COLLECTION_NAME)
                    .deleteOne({ id: studentId });

                if (deleteResult?.deletedCount === 1) {
                    return {
                        data: {},
                        success: true,
                        status: 200,
                        message: `${studentId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 422,
                        message: `${studentId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: `${studentId} not found`,
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 403,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

export const StudentService = {
    createStudentService,
    getStudentListService,
    getAStudentService,
    updateAStudentService,
    deleteAStudentService
};
