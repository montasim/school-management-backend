/**
 * @fileoverview Middleware Validators for Download Data.
 *
 * This module contains middleware functions for validating download-related data in Express routes.
 * It leverages Joi schemas defined in the DownloadValidationSchemas module to validate the format and content
 * of request bodies and parameters specific to download operations. These validators ensure that incoming
 * data for downloads adheres to the expected structure and types before further processing. Each validator
 * function is designed to be used as Express middleware, checking the validity of the data and passing control
 * to the next middleware if validation succeeds, or sending an error response if it fails.
 *
 * @requires DownloadValidationSchemas - Schemas for validating download data.
 * @requires validateWithSchema - Generic utility to validate data with a Joi schema.
 * @module DownloadValidationService - Exported validators for download route handling.
 */

import { DownloadValidationSchemas } from "./download.schema.js";
import validateWithSchema from "../../../helpers/validateWithSchema.js";

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
    validateDownloadParams,
};