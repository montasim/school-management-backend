import Joi from "joi";

/**
 * Regular expression pattern for different category ID prefixes.
 * @constant {RegExp}
 */
const categoryIdPattern = /^(category)-\w+$/;

/**
 * Joi schema for validating category IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(categoryIdPattern).min(9).max(20);

/**
 * Joi schema for validating the creation of a new category.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const categoryBodySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a category by its ID.
 * @constant {Object}
 */
const categoryParamsSchema = idSchema.required();

/**
 * Joi schema to validate the delete category query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches either 'admin' or 'user'. This schema is used primarily to
 * determine the role or type of user attempting to delete a category.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteCategoryQuerySchema = Joi.string().valid('admin', 'user').required();

/**
 * Collection of category-related Joi validation schemas.
 * @namespace CategorySchema
 * @type {Object}
 */
export const CategorySchema = {
    categoryBodySchema,
    categoryParamsSchema,
    deleteCategoryQuerySchema,
};
