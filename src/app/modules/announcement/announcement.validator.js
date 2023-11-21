/**
 * @fileoverview Announcement Validators Middleware
 *
 * This module contains middleware functions for validating announcement-related data.
 * These middleware functions are used in the announcement routes to ensure that the
 * request data conforms to the expected schema before further processing.
 *
 * @module AnnouncementValidatorsMiddleware
 */

import validateDataWithSchema from "../../../helpers/validateDataWithSchema.js";
import { AnnouncementSchema } from "./announcement.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for announcement's body data.
 *
 * Uses the announcementBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the announcement's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const announcementBodyValidator = validateDataWithSchema(AnnouncementSchema.announcementBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for announcement's ID in request parameters.
 *
 * Uses the announcementParamsSchema from the DashboardSchema to validate
 * the announcement ID provided in the request parameters. This ensures that
 * the announcement ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const announcementParamsValidator = await validateDataWithSchema(AnnouncementSchema.announcementParamsSchema, 'params');

/**
 * @namespace AnnouncementValidators
 * @description Exported announcement validators to be used in routes.
 */
export const AnnouncementValidators = {
    announcementBodyValidator,
    announcementParamsValidator,
};