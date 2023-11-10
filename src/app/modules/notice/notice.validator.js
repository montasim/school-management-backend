/**
 * @fileoverview Middleware Validators for Notice Data.
 *
 * This module contains middleware functions for validating notice-related data in Express routes.
 * It leverages Joi schemas defined in the NoticeValidationSchemas module to validate the format and content
 * of request bodies and parameters specific to notice operations. These validators ensure that incoming
 * data for notices adheres to the expected structure and types before further processing. Each validator
 * function is designed to be used as Express middleware, checking the validity of the data and passing control
 * to the next middleware if validation succeeds, or sending an error response if it fails.
 *
 * @requires NoticeValidationSchemas - Schemas for validating notice data.
 * @requires validateWithSchema - Generic utility to validate data with a Joi schema.
 * @module NoticeValidationService - Exported validators for notice route handling.
 */

import { NoticeValidationSchemas } from "./notice.schema.js";
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
const validateNoticeBody = validateWithSchema(NoticeValidationSchemas.noticeBodyValidationSchema, 'body');

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
const validateNoticeParams = validateWithSchema(NoticeValidationSchemas.noticeParamsValidationSchema, 'params');

/**
 * @namespace NoticeValidationService
 * @description Exported notice validators to be used in routes.
 */
export const NoticeValidationService = {
    validateNoticeBody,
    validateNoticeParams,
};