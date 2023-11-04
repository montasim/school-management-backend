import { NoticeSchema } from "./notice.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for notice's body data.
 *
 * Uses the noticeBodySchema from the NoticeSchema to validate
 * the body of the incoming request. This ensures that the notice's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const noticeBodyValidator = validateWithSchema(NoticeSchema.noticeBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for notice's ID in request parameters.
 *
 * Uses the noticeParamsSchema from the NoticeSchema to validate
 * the notice ID provided in the request parameters. This ensures that
 * the notice ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const noticeParamsValidator = validateWithSchema(NoticeSchema.noticeParamsSchema, 'params');

/**
 * @namespace NoticeValidators
 * @description Exported notice validators to be used in routes.
 */
export const NoticeValidators = {
    noticeBodyValidator,
    noticeParamsValidator,
};