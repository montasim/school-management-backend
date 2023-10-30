import { v4 as uuidv4 } from 'uuid';
import { ADMINISTRATION_COLLECTION_NAME } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isAdministrationAlreadyExists from "../../../shared/isAdministrationAlreadyExists.js";
import isAdministrationValid from "../../../shared/isAdministrationValid.js";

/**
 * Creates a new administration in the database after performing necessary checks.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {Object} newAdministrationDetails - Details of the administration to be created.
 * @param {string} newAdministrationDetails.name - The name of the administration.
 * @param {string} newAdministrationDetails.requestedBy - The requester's identifier.
 * @returns {Promise<Object>} The result of the administration creation.
 * @returns {Object} result.data - Data associated with the operation.
 * @returns {boolean} result.success - Whether the operation was successful.
 * @returns {number} result.status - HTTP status code representing the outcome.
 * @returns {string} result.message - Message describing the outcome.
 * @throws Will throw an error if any error occurs during the execution.
 */
const createAdministrationService = async (db,  newAdministrationDetails) => {
    try {
        const {
            name,
            category,
            designation,
            image,
            requestedBy
        } = newAdministrationDetails;
        const isDuplicateAdministration = await isAdministrationAlreadyExists(db, name);
        const isValidRequester = await isRequesterValid(db, requestedBy);
            if (isValidRequester) {
                const prepareNewAdministrationDetails = {
                    id: `administration-${uuidv4().substr(0, 6)}`,
                    name: name,
                    category: category,
                    designation: designation,
                    image: image,
                    createdBy: requestedBy,
                    createdAt: new Date(),
                };

                const createNewAdministrationResult = await db
                    .collection(ADMINISTRATION_COLLECTION_NAME)
                    .insertOne(prepareNewAdministrationDetails);

                if (createNewAdministrationResult?.acknowledged) {
                    delete prepareNewAdministrationDetails?._id;

                    return {
                        data: prepareNewAdministrationDetails,
                        success: true,
                        status: 200,
                        message: `${prepareNewAdministrationDetails?.name} created successfully`
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
const getAdministrationListService = async (db) => {
    try {
        const administrationList = await db
            .collection(ADMINISTRATION_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (administrationList?.length > 0) {
            return {
                data: administrationList,
                success: true,
                status: 200,
                message: `${administrationList?.length} administration found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: 'No administration found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a specific administration by its ID from the database.
 *
 * @function
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} administrationId - The ID of the administration to be fetched.
 *
 * @returns {Promise<Object>} The result object.
 * @returns {Object} result.data - The found administration data or an empty object if not found.
 * @returns {boolean} result.success - Indicates whether the operation was successful.
 * @returns {number} result.status - The HTTP status code.
 * @returns {string} result.message - The message indicating the result of the operation.
 *
 * @throws {Error} Throws an error if there is any issue with the database operation.
 */
const getAAdministrationService = async (db, administrationId) => {
    try {
        const foundAdministration = await db
            .collection(ADMINISTRATION_COLLECTION_NAME)
            .findOne({ id: administrationId }, { projection: { _id: 0 } });

        if (foundAdministration) {
            return {
                data: foundAdministration,
                success: true,
                status: 200,
                message: `${administrationId} found successfully`
            };
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: `${administrationId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service to update an administration in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} administrationId - The ID of the administration to be updated.
 * @param {Object} newAdministrationDetails - The new details for the administration.
 * @param {string} [newAdministrationDetails.name] - The new name for the administration (optional).
 * @param {string} newAdministrationDetails.requestedBy - The ID of the user making the request.
 *
 * @returns {Promise<Object>} The result object containing:
 * - `data`: The updated administration details (if updated successfully).
 * - `success`: A boolean indicating if the update operation was successful.
 * - `status`: The HTTP status code for the operation.
 * - `message`: A message indicating the result of the operation.
 *
 * @throws {Error} If there's any error during the update operation.
 */
const updateAAdministrationService = async (db, administrationId, newAdministrationDetails) => {
    try {
        const foundAdministration = await db
            .collection(ADMINISTRATION_COLLECTION_NAME)
            .findOne({ id: administrationId }, { projection: { _id: 0 } });

        if (foundAdministration) {
            const {
                name,
                category,
                designation,
                image,
                requestedBy
            } = newAdministrationDetails;
            const updatedAdministrationDetails = {
                id: foundAdministration?.id,
                ...(name && { name }),
                ...(category && { category }),
                ...(designation && { designation }),
                ...(image && { image }),
                createdBy: foundAdministration?.createdBy,
                createdAt: foundAdministration?.createdAt,
                modifiedBy: requestedBy,
                modifiedAt: new Date(),
            };
            const updateSuperAdminDataResult = await db
                .collection(ADMINISTRATION_COLLECTION_NAME)
                .updateOne(
                    { id: administrationId },
                    { $set: updatedAdministrationDetails },
                );

            if (updateSuperAdminDataResult?.modifiedCount > 0) {
                const updatedData = await db
                    .collection(ADMINISTRATION_COLLECTION_NAME)
                    .findOne({ id: administrationId });

                delete updatedData._id;

                return {
                    data: updatedData,
                    success: true,
                    status: 200,
                    message: `${administrationId} updated successfully`
                };
            } else {
                return {
                    data: {},
                    success: false,
                    status: 422,
                    message: `${administrationId} not updated`
                };
            }
        } else {
            return {
                data: {},
                success: false,
                status: 404,
                message: `${administrationId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service for deleting an administration.
 *
 * @async
 * @function
 * @param {object} db - The database connection object.
 * @param {string} requestedBy - The requester's identifier.
 * @param {string} administrationId - The ID of the administration to delete.
 * @returns {Promise<Object>} An object containing the result of the delete operation.
 * @throws {Error} Throws an error if an issue arises during the delete process.
 *
 * @example
 *
 * const response = await deleteAAdministrationService(dbInstance, 'userId123', 'administrationId456');
 * console.log(response.message); // Outputs: 'administrationId456 deleted successfully'
 */
const deleteAAdministrationService = async (db, requestedBy, administrationId) => {
    try {
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isValidRequester) {
            const isAdministrationExists = await isAdministrationValid(db, administrationId);

            if (isAdministrationExists) {
                const deleteResult = await db
                    .collection(ADMINISTRATION_COLLECTION_NAME)
                    .deleteOne({ id: administrationId });

                if (deleteResult?.deletedCount === 1) {
                    return {
                        data: {},
                        success: true,
                        status: 200,
                        message: `${administrationId} deleted successfully`,
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: 422,
                        message: `${administrationId} could not be deleted`,
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: 404,
                    message: `${administrationId} not found`,
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

export const AdministrationService = {
    createAdministrationService,
    getAdministrationListService,
    getAAdministrationService,
    updateAAdministrationService,
    deleteAAdministrationService
};
