import { DownloadValidationSchemas } from "./download.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

/**
 * @function
 * @async
 * @description Middleware validator for download's body data.
 *
 * Uses the downloadBodySchema from the DownloadSchema to validate
 * the body of the incoming request. This ensures that the download's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateDownloadBody = validateWithSchema(DownloadValidationSchemas.downloadBodyValidationSchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for download's ID in request parameters.
 *
 * Uses the downloadParamsSchema from the DownloadSchema to validate
 * the download ID provided in the request parameters. This ensures that
 * the download ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const validateDownloadParams = validateWithSchema(DownloadValidationSchemas.downloadParamsValidationSchema, 'params');

/**
 * @namespace DownloadValidationService
 * @description Exported download validators to be used in routes.
 */
export const DownloadValidationService = {
    validateDownloadBody,
    validateDownloadParams,
};