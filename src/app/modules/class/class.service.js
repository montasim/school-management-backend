import { v4 as uuidv4 } from 'uuid';
import { CLASS_COLLECTION_NAME } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isClassAlreadyExists from "../../../shared/isClassAlreadyExists.js";
import isClassValid from "../../../shared/isClassValid.js";

/**
 * Creates a new class in the database after performing necessary checks.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {Object} newClassDetails - Details of the class to be created.
 * @param {string} newClassDetails.name - The name of the class.
 * @param {string} newClassDetails.requestedBy - The requester's identifier.
 * @returns {Promise<Object>} The result of the class creation.
 * @returns {Object} result.data - Data associated with the operation.
 * @returns {boolean} result.success - Whether the operation was successful.
 * @returns {number} result.status - HTTP status code representing the outcome.
 * @returns {string} result.message - Message describing the outcome.
 * @throws Will throw an error if any error occurs during the execution.
 */
const createClassService = async (db,  newClassDetails) => {
    try {
        const { name, requestedBy} = newClassDetails;
        const isDuplicateClass = await isClassAlreadyExists(db, name);
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isDuplicateClass) {
            return {
                data: {},
                success: true,
                status: 422,
                message: `${name} already exists`
            };
        } else {
            if (isValidRequester) {
                const prepareNewClassDetails = {
                    id: `class-${uuidv4().substr(0, 6)}`,
                    name: name,
                    createdBy: requestedBy,
                    createdAt: new Date(),
                };

                const createNewClassResult = await db
                    .collection(CLASS_COLLECTION_NAME)
                    .insertOne(prepareNewClassDetails);

                if (createNewClassResult?.acknowledged) {
                    delete prepareNewClassDetails?._id;

                    return {
                        data: prepareNewClassDetails,
                        success: true,
                        status: 200,
                        message: `${prepareNewClassDetails?.name} created successfully`
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
                    status: 401,
                    message: 'You do not have necessary permission'
                };
            }
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
const getClassListService = async (db) => {
    try {
        const classList = await db
            .collection(CLASS_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (classList?.length > 0) {
            return {
                data: classList,
                success: false,
                status: 200,
                message: `${classList?.length} class found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: 'No class found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a specific class by its ID from the database.
 *
 * @function
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} classId - The ID of the class to be fetched.
 *
 * @returns {Promise<Object>} The result object.
 * @returns {Object} result.data - The found class data or an empty object if not found.
 * @returns {boolean} result.success - Indicates whether the operation was successful.
 * @returns {number} result.status - The HTTP status code.
 * @returns {string} result.message - The message indicating the result of the operation.
 *
 * @throws {Error} Throws an error if there is any issue with the database operation.
 */
const getAClassService = async (db, classId) => {
    try {
        const foundClass = await db
            .collection(CLASS_COLLECTION_NAME)
            .findOne({ id: classId }, { projection: { _id: 0 } });

        if (foundClass) {
            return {
                data: foundClass,
                success: true,
                status: 200,
                message: `${classId} found successfully`
            };
        } else {
            return {
                data: {},
                success: true,
                status: 404,
                message: `${classId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service to update a class in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} classId - The ID of the class to be updated.
 * @param {Object} newClassDetails - The new details for the class.
 * @param {string} [newClassDetails.name] - The new name for the class (optional).
 * @param {string} newClassDetails.requestedBy - The ID of the user making the request.
 *
 * @returns {Promise<Object>} The result object containing:
 * - `data`: The updated class details (if updated successfully).
 * - `success`: A boolean indicating if the update operation was successful.
 * - `status`: The HTTP status code for the operation.
 * - `message`: A message indicating the result of the operation.
 *
 * @throws {Error} If there's any error during the update operation.
 */
const updateAClassService = async (db, classId, newClassDetails) => {
    try {
        const foundClass = await db
            .collection(CLASS_COLLECTION_NAME)
            .findOne({ id: classId }, { projection: { _id: 0 } });

        if (foundClass) {
            const { name, requestedBy} = newClassDetails;
            const updatedClassDetails = {
                id: foundClass?.id,
                ...(name && { name }),
                createdBy: foundClass?.createdBy,
                createdAt: foundClass?.createdAt,
                modifiedBy: requestedBy,
                modifiedAt: new Date(),
            };
            const updateSuperAdminDataResult = await db
                .collection(CLASS_COLLECTION_NAME)
                .updateOne(
                    { id: classId },
                    { $set: updatedClassDetails },
                );

            if (updateSuperAdminDataResult?.modifiedCount > 0) {
                const updatedData = await db
                    .collection(CLASS_COLLECTION_NAME)
                    .findOne({ id: classId });

                delete updatedData._id;

                return {
                    data: updatedData,
                    success: true,
                    status: 200,
                    message: `${classId} updated successfully`
                };
            } else {
                return {
                    data: {},
                    success: true,
                    status: 422,
                    message: `${classId} not updated`
                };
            }
        } else {
            return {
                data: {},
                success: true,
                status: 404,
                message: `${classId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service for deleting a class.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} requestedBy - The requester's identifier.
 * @param {string} classId - The ID of the class to delete.
 * @returns {Promise<Object>} An object containing the result of the delete operation.
 * @throws {Error} Throws an error if an issue arises during the delete process.
 *
 * @example
 *
 * const response = await deleteAClassService(dbInstance, 'userId123', 'classId456');
 * console.log(response.message); // Outputs: 'classId456 deleted successfully'
 */
const deleteAClassService = async (db, requestedBy, classId) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const isClassExists = await isClassValid(db, classId);

            if (isClassExists) {
                const deleteResult = await db
                    .collection(CLASS_COLLECTION_NAME)
                    .deleteOne({ id: classId });

                if (deleteResult?.deletedCount === 1) {
                    return {
                        data: {},
                        success: true,
                        status: 200,
                        message: `${classId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 422,
                        message: `${classId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: `${classId} not found`,
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 401,
                message: 'You do not have necessary permission'
            };
        }
    } catch (error) {
        throw error;
    }
};

export const ClassService = {
    createClassService,
    getClassListService,
    getAClassService,
    updateAClassService,
    deleteAClassService
};
