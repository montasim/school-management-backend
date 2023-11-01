import Joi from "joi";
import { ID_CONSTANTS } from './category.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const categoryParamsSchema = Joi.object({
    categoryId: createIdSchema(ID_CONSTANTS?.CATEGORY_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for category's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const categoryBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

/**
 * @namespace CategorySchema
 * @description Exported Joi validation schemas for category data.
 *
 * - `categoryBodySchema`: Validates the body data of a category.
 * - `categoryParamsSchema`: Validates the category ID in request parameters.
 */
export const CategorySchema = {
    categoryBodySchema,
    categoryParamsSchema,
};