import { StatusCodes } from "http-status-codes";
import { RoutineSchema } from "./routine.schema.js";

/**
 * Middleware function to validate the creation of a new routine.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const routineBodyValidator = async (req, res, next) => {
    try {
        const { error } = RoutineSchema.routineBodySchema.validate(req?.body);
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
 * Middleware function to validate fetching a routine by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const routineParamsValidator = async (req, res, next) => {
    try {
        const { error } = RoutineSchema.routineParamsSchema.validate(req?.params?.fileName);
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
 * Middleware to validate the query parameters for deleting a routine.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteRoutineQueryValidator = async (req, res, next) => {
    try {
        const { error } = RoutineSchema.deleteRoutineQuerySchema.validate(req?.query?.requestedBy);
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
 * Collection of validator middlewares related to routine operations.
 * @typedef {Object} RoutineValidators
 * @property {function} routineBodyValidator - Validates creation of new routine.
 * @property {function} routineParamsValidator - Validates fetching a routine by its ID.
 */
export const RoutineValidators = {
    routineBodyValidator,
    routineParamsValidator,
    deleteRoutineQueryValidator
};
