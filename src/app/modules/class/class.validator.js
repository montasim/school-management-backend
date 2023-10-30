import { ClassSchema } from "./class.schema.js";

/**
 * Middleware function to validate the creation of a new class.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const classBodyValidator = async (req, res, next) => {
    try {
        const { error } = ClassSchema.classBodySchema.validate(req?.body);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware function to validate fetching a class by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const classParamsValidator = async (req, res, next) => {
    try {
        const { error } = ClassSchema.classParamsSchema.validate(req?.params?.classId);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware to validate the query parameters for deleting a class.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteClassQueryValidator = async (req, res, next) => {
    try {
        const { error } = ClassSchema.deleteClassQuerySchema.validate(req?.query?.requestedBy);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Collection of validator middlewares related to class operations.
 * @typedef {Object} ClassValidators
 * @property {function} classBodyValidator - Validates creation of new class.
 * @property {function} classParamsValidator - Validates fetching a class by its ID.
 */
export const ClassValidators = {
    classBodyValidator,
    classParamsValidator,
    deleteClassQueryValidator
};
