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

const updateACategoryService = async (db, res, newCategoryDetails) => {
    try {
        res.status(200).json(newCategoryDetails);
    } catch (error) {
        return res.status(500).json(newCategoryDetails);
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
    getACategoryService,
    updateACategoryService,
    deleteACategoryService
};
