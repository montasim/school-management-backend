import { StatusCodes } from "http-status-codes";
import { CategorySchema } from "./category.schema.js";

/**
 * Middleware function to validate the creation of a new category.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const categoryBodyValidator = async (req, res, next) => {
    try {
        const { error } = CategorySchema.categoryBodySchema.validate(req?.body);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Middleware function to validate fetching a category by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const categoryParamsValidator = async (req, res, next) => {
    try {
        const { error } = CategorySchema.categoryParamsSchema.validate(req?.params?.categoryId);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Middleware to validate the query parameters for deleting a category.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteCategoryQueryValidator = async (req, res, next) => {
    try {
        const { error } = CategorySchema.deleteCategoryQuerySchema.validate(req?.query?.requestedBy);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

/**
 * Collection of validator middlewares related to category operations.
 * @typedef {Object} CategoryValidators
 * @property {function} categoryBodyValidator - Validates creation of new category.
 * @property {function} categoryParamsValidator - Validates fetching a category by its ID.
 */
export const CategoryValidators = {
    categoryBodyValidator,
    categoryParamsValidator,
    deleteCategoryQueryValidator
};
