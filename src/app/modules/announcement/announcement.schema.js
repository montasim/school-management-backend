/**
 * @fileoverview Announcement Validation Schemas
 *
 * This module defines Joi validation schemas for announcement-related data.
 * These schemas are used to validate the format and constraints of data related
 * to announcements, such as body data and request parameters.
 *
 * @module AnnouncementSchema
 */

import Joi from "joi";
import { ANNOUNCEMENT_CONSTANTS } from './announcement.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";
import {JoiSchemaGenerators} from "../../../shared/joiSchemaGenerators.js";
import {CATEGORY_CONSTANTS} from "../category/category.constants.js";

/**
 * @description Joi validation schema for announcement's parameters in the request.
 * Validates the announcementId parameter.
 *
 * - `announcementId`: Should be a string with a minimum length of 12 and a maximum length of 12.
 */
const announcementParamsSchema = Joi.object({
    announcementId: createIdSchema(
        ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_ID_PREFIX,
        ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_ID_MIN_LENGTH,
        ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_ID_MAX_LENGTH
    ).required()
});

/**
 * @description Joi validation schema for announcement's body data.
 * Validates the name field.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 12.
 */
const announcementBodySchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_NAME_MIN_LENGTH,
        ANNOUNCEMENT_CONSTANTS?.ANNOUNCEMENT_NAME_MAX_LENGTH,
    ),
});

/**
 * @namespace AnnouncementSchema
 * @description Exported Joi validation schemas for announcement data.
 *
 * - `announcementBodySchema`: Validates the body data of an announcement.
 * - `announcementParamsSchema`: Validates the announcement ID in request parameters.
 */
export const AnnouncementSchema = {
    announcementBodySchema,
    announcementParamsSchema,
};