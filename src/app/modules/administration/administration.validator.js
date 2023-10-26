import { StatusCodes } from "http-status-codes";
import { AdministrationSchema } from "./administration.schema.js";

/**
 * Middleware function to validate the creation of a new administration.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const administrationBodyValidator = async (req, res, next) => {
    try {
        const { error } = AdministrationSchema.administrationBodySchema.validate(req?.body);
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
 * Middleware function to validate fetching an administration by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const administrationParamsValidator = async (req, res, next) => {
    try {
        const { error } = AdministrationSchema.administrationParamsSchema.validate(req?.params?.administrationId);
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
 * Middleware to validate the query parameters for deleting an administration.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteAdministrationQueryValidator = async (req, res, next) => {
    try {
        const { error } = AdministrationSchema.deleteAdministrationQuerySchema.validate(req?.query?.requestedBy);
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
 * Collection of validator middlewares related to administration operations.
 * @typedef {Object} AdministrationValidators
 * @property {function} administrationBodyValidator - Validates creation of new administration.
 * @property {function} administrationParamsValidator - Validates fetching an administration by its ID.
 */
export const AdministrationValidators = {
    administrationBodyValidator,
    administrationParamsValidator,
    deleteAdministrationQueryValidator
};
