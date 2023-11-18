import Joi from "joi";
import { ID_CONSTANTS } from './level.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const levelParamsSchema = Joi.object({
    levelId: createIdSchema(ID_CONSTANTS?.LEVEL_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});

/**
 * @description Joi validation schema for level's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const levelBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

/**
 * @namespace LevelSchema
 * @description Exported Joi validation schemas for level data.
 *
 * - `levelBodySchema`: Validates the body data of a level.
 * - `levelParamsSchema`: Validates the level ID in request parameters.
 */
export const LevelSchema = {
    levelBodySchema,
    levelParamsSchema,
};