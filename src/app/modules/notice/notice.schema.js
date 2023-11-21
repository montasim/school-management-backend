/**
 * @fileoverview Joi Validation Schemas for Notice Data.
 *
 * This module defines Joi validation schemas for handling notice data in the application.
 * It includes schemas for validating the body and parameter data of notice-related requests.
 * These schemas are used to ensure that incoming data for notice operations conforms to the
 * expected format and types, leveraging the Joi library for schema definition and validation.
 * The schemas are exported and used in conjunction with middleware validators in the routes
 * handling notice operations to ensure data integrity and adherence to expected structures.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires JoiSchemaGenerators - Utility functions to generate common Joi schemas.
 * @requires constants - Application constants, including file extension types.
 * @module NoticeValidationSchemas - Exported Joi schemas for validating notice data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";
import { NOTICE_CONSTANTS } from "./notice.constants.js";

const newNoticeValidationSchema = Joi.object({
    title: JoiSchemaGenerators?.createStringSchema(
        "title",
        NOTICE_CONSTANTS?.PROPERTY_TITLE_MIN_LENGTH,
        NOTICE_CONSTANTS?.PROPERTY_TITLE_MAX_LENGTH
    ).required(),
})

/**
 * @description Joi validation schema for notice's params data.
 */
const noticeParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace NoticeValidationSchemas
 * @description Exported Joi validation schemas for download data.
 *
 * - `newNoticeValidationSchema`: Validates the body data of a notice.
 * - `noticeParamsValidationSchema`: Validates the notice ID in request parameters.
 */
export const NoticeValidationSchemas = {
    newNoticeValidationSchema,
    noticeParamsValidationSchema,
};