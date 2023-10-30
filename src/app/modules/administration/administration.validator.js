import { AdministrationSchema } from "./administration.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for administration's body data.
 *
 * Uses the administrationBodySchema from the AdministrationSchema to validate
 * the body of the incoming request. This ensures that the administration's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const administrationBodyValidator = validateWithSchema(AdministrationSchema.administrationBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for administration's ID in request parameters.
 *
 * Uses the administrationParamsSchema from the AdministrationSchema to validate
 * the administration ID provided in the request parameters. This ensures that
 * the administration ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const administrationParamsValidator = await validateWithSchema(AdministrationSchema.administrationParamsSchema, 'params');

/**
 * @namespace AdministrationValidators
 * @description Exported administration validators to be used in routes.
 */
export const AdministrationValidators = {
    administrationBodyValidator,
    administrationParamsValidator,
};
