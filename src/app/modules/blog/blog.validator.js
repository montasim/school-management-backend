import validateWithSchema from "../../../helpers/validateWithSchema.js";
import { BlogPostSchema } from "./blog.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for blogPost body data.
 *
 * Uses the blogPostBodySchema from the BlogPostSchema to validate
 * the body of the incoming request. This ensures that the blogPost
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const blogPostBody = validateWithSchema(BlogPostSchema.blogPostBody, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for blogPost ID in request parameters.
 *
 * Uses the blogPostParamsSchema from the BlogPostSchema to validate
 * the blogPost ID provided in the request parameters. This ensures that
 * the blogPost ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const blogPostParams = await validateWithSchema(BlogPostSchema.blogPostParams, 'params');

/**
 * @namespace BlogPostValidators
 * @description Exported blogPost validators to be used in routes.
 */
export const BlogPostValidators = {
    blogPostBody,
    blogPostParams,
};