import validateWithSchema from "../../../helpers/validateWithSchema.js";
import { OthersInformationSchema } from "./othersInformation.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for othersInformation's body data.
 *
 * Uses the othersInformationBodySchema from the HomePagePostSchema to validate
 * the body of the incoming request. This ensures that the othersInformation's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const othersInformationBodyValidator = validateWithSchema(OthersInformationSchema.othersInformationBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for othersInformation's ID in request parameters.
 *
 * Uses the othersInformationParamsSchema from the HomePagePostSchema to validate
 * the othersInformation ID provided in the request parameters. This ensures that
 * the othersInformation ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const othersInformationParamsValidator = await validateWithSchema(OthersInformationSchema.othersInformationParamsSchema, 'params');

/**
 * @namespace OthersInformationValidators
 * @description Exported othersInformation validators to be used in routes.
 */
export const OthersInformationValidators = {
    othersInformationBodyValidator,
    othersInformationParamsValidator,
};
