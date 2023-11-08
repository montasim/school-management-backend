import validateWithSchema from "../../../../helpers/validateWithSchema.js";
import { HomePagePostSchema } from "./homePagePost.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for homePagePost body data.
 *
 * Uses the homePagePostBodySchema from the HomePagePostSchema to validate
 * the body of the incoming request. This ensures that the homePagePost
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const homePagePostBody = validateWithSchema(HomePagePostSchema.homePagePostBody, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for homePagePost ID in request parameters.
 *
 * Uses the homePagePostParamsSchema from the HomePagePostSchema to validate
 * the homePagePost ID provided in the request parameters. This ensures that
 * the homePagePost ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const homePagePostParams = await validateWithSchema(HomePagePostSchema.homePagePostParams, 'params');

/**
 * @namespace HomePagePostValidators
 * @description Exported homePagePost validators to be used in routes.
 */
export const HomePagePostValidators = {
    homePagePostBody,
    homePagePostParams,
};
