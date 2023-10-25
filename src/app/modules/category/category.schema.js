import Joi from "joi";

/**
 * Regular expression pattern for different category ID prefixes.
 * @constant {RegExp}
 */
const idPattern = /^(category)-\w+$/;

/**
 * Joi schema for validating category IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(idPattern).min(9).max(20);

/**
 * Joi schema for validating the creation of a new category.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a category by its ID.
 * @constant {Object}
 */
const categoryParamsSchema = idSchema.required();

/**
 * Collection of category-related Joi validation schemas.
 * @namespace CategorySchema
 * @type {Object}
 */
export const CategorySchema = {
    createCategorySchema,
    categoryParamsSchema
};
