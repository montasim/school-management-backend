import Joi from "joi";

/**
 * Regular expression pattern for different download ID prefixes.
 * @constant {RegExp}
 */
const fileNamePattern = /^(download)-\w+$/;

/**
 * Joi schema for validating download IDs based on a specific pattern and length.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(fileNamePattern).min(9).max(30);

/**
 * Joi schema for validating the creation of a new download.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const downloadBodySchema = Joi.object({
    requestedBy: Joi.string().min(3).max(20).optional(),
});

/**
 * Joi schema for validating the retrieval of a download by its ID.
 * @constant {Object}
 */
const downloadParamsSchema = idSchema.required();

/**
 * Joi schema to validate the delete download query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches either 'admin' or 'user'. This schema is used primarily to
 * determine the role or type of user attempting to delete a download.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteDownloadQuerySchema = Joi.string().valid('admin', 'user').required();

/**
 * Collection of download-related Joi validation schemas.
 * @namespace DownloadSchema
 * @type {Object}
 */
export const DownloadSchema = {
    downloadBodySchema,
    downloadParamsSchema,
    deleteDownloadQuerySchema,
};
