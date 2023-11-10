/**
 * @fileoverview Joi Validation Schemas for Download Data.
 *
 * This module defines Joi validation schemas for handling download data in the application.
 * It includes schemas for validating the body and parameter data of download-related requests.
 * These schemas are used to ensure that incoming data for download operations conforms to the
 * expected format and types, leveraging the Joi library for schema definition and validation.
 * The schemas are exported and used in conjunction with middleware validators in the routes
 * handling download operations to ensure data integrity and adherence to expected structures.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @requires constants - Application constants, including file extension types.
 * @module DownloadValidationSchemas - Exported Joi schemas for validating download data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for download's body data.
 */
const downloadBodyValidationSchema = JoiSchemaGenerators.fileTitleValidationSchema();

/**
 * @description Joi validation schema for download's params data.
 */

const downloadParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace DownloadValidationSchemas
 * @description Exported Joi validation schemas for download data.
 *
 * - `downloadBodySchema`: Validates the body data of a download.
 * - `downloadParamsSchema`: Validates the download ID in request parameters.
 */
export const DownloadValidationSchemas = {
    downloadBodyValidationSchema,
    downloadParamsValidationSchema,
};