import { StatusCodes } from "http-status-codes";
import { CATEGORY_COLLECTION_NAME } from "../../../constants/index.js";
import isRequesterValid from "../../../shared/isRequesterValid.js";
import isCategoryAlreadyExists from "../../../shared/isCategoryAlreadyExists.js";

/**
 * Creates a new category in the database after performing necessary checks.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {Object} newCategoryDetails - Details of the category to be created.
 * @param {string} newCategoryDetails.name - The name of the category.
 * @param {string} newCategoryDetails.requestedBy - The requester's identifier.
 * @returns {Promise<Object>} The result of the category creation.
 * @returns {Object} result.data - Data associated with the operation.
 * @returns {boolean} result.success - Whether the operation was successful.
 * @returns {number} result.status - HTTP status code representing the outcome.
 * @returns {string} result.message - Message describing the outcome.
 * @throws Will throw an error if any error occurs during the execution.
 */
const createCategoryService = async (db,  newCategoryDetails) => {
    try {
        const { name, requestedBy} = newCategoryDetails;
        const isDuplicateCategory = await isCategoryAlreadyExists(db, name);
        const isValidRequester = await isRequesterValid(db, requestedBy);

        if (isDuplicateCategory) {
            return {
                data: {},
                success: true,
                status: StatusCodes.UNPROCESSABLE_ENTITY,
                message: `${name} already exists`
            };
        } else {
            if (isValidRequester) {
                const prepareNewCategoryDetails = {
                    name: name,
                    createdBy: requestedBy,
                    createdAt: new Date(),
                };

                const createNewCategoryResult = await db
                    .collection(CATEGORY_COLLECTION_NAME)
                    .insertOne(prepareNewCategoryDetails);

                if (createNewCategoryResult?.acknowledged) {
                    delete prepareNewCategoryDetails?._id;

                    return {
                        data: prepareNewCategoryDetails,
                        success: true,
                        status: StatusCodes.OK,
                        message: `${prepareNewCategoryDetails?.name} created successfully`
                    };
                } else {
                    return {
                        data: {},
                        success: false,
                        status: StatusCodes.INTERNAL_SERVER_ERROR,
                        message: 'Failed to create'
                    };
                }
            } else {
                return {
                    data: {},
                    success: false,
                    status: StatusCodes.UNAUTHORIZED,
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
const getCategoryListService = async (db) => {
    try {
        const categoryList = await db
            .collection(CATEGORY_COLLECTION_NAME)
            .find({}, { projection: { _id: 0 } })
            .toArray();

        if (categoryList?.length > 0) {
            return {
                data: categoryList,
                success: false,
                status: StatusCodes.OK,
                message: `${categoryList?.length} category found`
            };
        } else {
            return {
                data: {},
                success: false,
                status: StatusCodes.NOT_FOUND,
                message: 'No category found'
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Fetches a specific category by its ID from the database.
 *
 * @function
 * @async
 * @param {Object} db - The database connection object.
 * @param {string} categoryId - The ID of the category to be fetched.
 *
 * @returns {Promise<Object>} The result object.
 * @returns {Object} result.data - The found category data or an empty object if not found.
 * @returns {boolean} result.success - Indicates whether the operation was successful.
 * @returns {number} result.status - The HTTP status code.
 * @returns {string} result.message - The message indicating the result of the operation.
 *
 * @throws {Error} Throws an error if there is any issue with the database operation.
 */
const getACategoryService = async (db, categoryId) => {
    try {
        const foundCategory = await db
            .collection(CATEGORY_COLLECTION_NAME)
            .findOne({ id: categoryId }, { projection: { _id: 0 } });

        if (foundCategory) {
            return {
                data: foundCategory,
                success: true,
                status: StatusCodes.OK,
                message: `${categoryId} found successfully`
            };
        } else {
            return {
                data: {},
                success: true,
                status: StatusCodes.NOT_FOUND,
                message: `${categoryId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

/**
 * Service to update a category in the database.
 *
 * @async
 * @function
 * @param {Object} db - The database connection object.
 * @param {string} categoryId - The ID of the category to be updated.
 * @param {Object} newCategoryDetails - The new details for the category.
 * @param {string} [newCategoryDetails.name] - The new name for the category (optional).
 * @param {string} newCategoryDetails.requestedBy - The ID of the user making the request.
 *
 * @returns {Promise<Object>} The result object containing:
 * - `data`: The updated category details (if updated successfully).
 * - `success`: A boolean indicating if the update operation was successful.
 * - `status`: The HTTP status code for the operation.
 * - `message`: A message indicating the result of the operation.
 *
 * @throws {Error} If there's any error during the update operation.
 */
const updateACategoryService = async (db, categoryId, newCategoryDetails) => {
    try {
        const foundCategory = await db
            .collection(CATEGORY_COLLECTION_NAME)
            .findOne({ id: categoryId }, { projection: { _id: 0 } });

        if (foundCategory) {
            const { name, requestedBy} = newCategoryDetails;
            const updatedCategoryDetails = {
                id: foundCategory?.id,
                ...(name && { name }),
                createdBy: foundCategory?.createdBy,
                createdAt: foundCategory?.createdAt,
                modifiedBy: requestedBy,
                modifiedAt: new Date(),
            };
            const updateSuperAdminDataResult = await db
                .collection(CATEGORY_COLLECTION_NAME)
                .updateOne(
                    { id: categoryId },
                    { $set: updatedCategoryDetails },
                );

            if (updateSuperAdminDataResult?.modifiedCount > 0) {
                const updatedData = await db
                    .collection(CATEGORY_COLLECTION_NAME)
                    .findOne({ id: categoryId });

                delete updatedData._id;

                return {
                    data: updatedData,
                    success: true,
                    status: StatusCodes.OK,
                    message: `${categoryId} updated successfully`
                };
            } else {
                return {
                    data: {},
                    success: true,
                    status: StatusCodes.UNPROCESSABLE_ENTITY,
                    message: `${categoryId} not updated`
                };
            }
        } else {
            return {
                data: {},
                success: true,
                status: StatusCodes.NOT_FOUND,
                message: `${categoryId} not found`
            };
        }
    } catch (error) {
        throw error;
    }
};

const deleteACategoryService = async (db, res, categoryDetails) => {
    try {
        res.status(200).json(categoryDetails);
    } catch (error) {
        return res.status(500).json(categoryDetails);
    }
};

export const CategoryService = {
    createCategoryService,
    getCategoryListService,
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};
