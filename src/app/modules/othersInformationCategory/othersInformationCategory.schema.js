import Joi from "joi";
import { ID_CONSTANTS } from './othersInformationCategory.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const othersInformationCategoryParamsSchema = Joi.object({
    othersInformationCategoryId: createIdSchema(ID_CONSTANTS?.OTHERS_INFORMATION_CATEGORY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for othersInformationCategory's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const othersInformationCategoryBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

/**
 * @namespace OthersInformationCategorySchema
 * @description Exported Joi validation schemas for othersInformationCategory data.
 *
 * - `othersInformationCategoryBodySchema`: Validates the body data of a othersInformationCategory.
 * - `othersInformationCategoryParamsSchema`: Validates the othersInformationCategory ID in request parameters.
 */
export const OthersInformationCategorySchema = {
    othersInformationCategoryBodySchema,
    othersInformationCategoryParamsSchema,
};