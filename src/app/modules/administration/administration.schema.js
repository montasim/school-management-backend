import Joi from "joi";

/**
 * Regular expression pattern for different administration ID prefixes.
 * @constant {RegExp}
 */
const administrationIdPattern = /^(administration)-\w+$/;

/**
 * Joi schema for validating administration IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(administrationIdPattern).min(9).max(30);

/**
 * Joi schema for validating the creation of a new administration.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const administrationBodySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    category: Joi.array().items(Joi.string().valid('শিক্ষকবৃন্দ', 'পরিচালনা পরিষদ')).required(),
    designation: Joi.string().min(1).required(),
    image: Joi.string().pattern(/\/image\/teacher\/[a-zA-Z0-9]+\.gif$/).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a administration by its ID.
 * @constant {Object}
 */
const administrationParamsSchema = idSchema.required();

/**
 * Joi schema to validate the delete administration query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches either 'admin' or 'user'. This schema is used primarily to
 * determine the role or type of user attempting to delete a administration.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteAdministrationQuerySchema = Joi.string().valid('admin', 'user').required();

/**
 * Collection of administration-related Joi validation schemas.
 * @namespace AdministrationSchema
 * @type {Object}
 */
export const AdministrationSchema = {
    administrationBodySchema,
    administrationParamsSchema,
    deleteAdministrationQuerySchema,
};
