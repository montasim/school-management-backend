import Joi from "joi";
import { ID_CONSTANTS } from './announcement.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const announcementParamsSchema = Joi.object({
    announcementId: createIdSchema(ID_CONSTANTS?.ANNOUNCEMENT_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for announcement's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const announcementBodySchema = Joi.object({
    name: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
});

/**
 * @namespace AnnouncementSchema
 * @description Exported Joi validation schemas for announcement data.
 *
 * - `announcementBodySchema`: Validates the body data of an announcement.
 * - `announcementParamsSchema`: Validates the announcement ID in request parameters.
 * - `deleteAnnouncementQuerySchema`: Validates the admin ID in the query.
 */
export const AnnouncementSchema = {
    announcementBodySchema,
    announcementParamsSchema,
};