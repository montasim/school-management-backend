import Joi from "joi";

/**
 * Regular expression pattern for different class ID prefixes.
 * @constant {RegExp}
 */
const classIdPattern = /^(class)-\w+$/;

/**
 * Joi schema for validating class IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(classIdPattern).min(9).max(20);

/**
 * Joi schema for validating the creation of a new class.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const classBodySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a class by its ID.
 * @constant {Object}
 */
const classParamsSchema = idSchema.required();

/**
 * Joi schema to validate the delete class query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches either 'admin' or 'user'. This schema is used primarily to
 * determine the role or type of user attempting to delete a class.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteClassQuerySchema = Joi.string().valid('admin', 'user').required();

/**
 * Collection of class-related Joi validation schemas.
 * @namespace ClassSchema
 * @type {Object}
 */
export const ClassSchema = {
    classBodySchema,
    classParamsSchema,
    deleteClassQuerySchema,
};
