import { ResultSchema } from "./result.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for result's body data.
 *
 * Uses the resultBodySchema from the ResultSchema to validate
 * the body of the incoming request. This ensures that the result's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const resultBodyValidator = validateWithSchema(ResultSchema.resultBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for result's ID in request parameters.
 *
 * Uses the resultParamsSchema from the ResultSchema to validate
 * the result ID provided in the request parameters. This ensures that
 * the result ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const resultParamsValidator = validateWithSchema(ResultSchema.resultParamsSchema, 'params');

/**
 * @namespace ResultValidators
 * @description Exported result validators to be used in routes.
 */
export const ResultValidators = {
    resultBodyValidator,
    resultParamsValidator,
};