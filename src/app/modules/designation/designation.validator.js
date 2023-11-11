import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { DesignationSchema } from "./designation.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for designation's body data.
 *
 * Uses the designationBodySchema from the DesignationSchema to validate
 * the body of the incoming request. This ensures that the designation's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const designationBodyValidator = validateDataWithSchema(DesignationSchema.designationBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for designation's ID in request parameters.
 *
 * Uses the designationParamsSchema from the DesignationSchema to validate
 * the designation ID provided in the request parameters. This ensures that
 * the designation ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const designationParamsValidator = await validateDataWithSchema(DesignationSchema.designationParamsSchema, 'params');

/**
 * @namespace DesignationValidators
 * @description Exported designation validators to be used in routes.
 */
export const DesignationValidators = {
    designationBodyValidator,
    designationParamsValidator,
};
