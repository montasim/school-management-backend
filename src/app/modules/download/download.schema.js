import Joi from "joi";

/**
 * Joi schema for validating the creation of a new download.
 * It expects a 'title', 'file', and 'requestedBy' properties in the request body.
 *
 * @type {Joi.ObjectSchema}
 * @constant
 */
const downloadBodySchema = Joi.object({
    title: Joi.string().min(3).max(40).required(),
    file: Joi.object({
        fieldname: Joi.string().valid('file').required(),
        originalname: Joi.string().min(3).max(100).required(),
        encoding: Joi.string().valid('7bit').required(),
        mimetype: Joi.string().valid('application/pdf').required(),
        destination: Joi.string().valid('./uploads').required(),
        filename: Joi.string().regex(/^[0-9]+\.pdf$/).required(),
        path: Joi.string().regex(/^uploads\\[0-9]+\.pdf$/).required(),
        size: Joi.number().max(1024 * 1024 * 5).required(),
    }),
    requestedBy: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a download by its ID.
 * The schema ensures that the provided ID is a string of minimum length 3 and maximum length 60.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const downloadParamsSchema = Joi.string().min(3).max(60).required();

/**
 * Joi schema to validate the delete download query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches the value 'admin'. This schema is used primarily to
 * determine the role or type of user attempting to delete a download.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteDownloadQuerySchema = Joi.string().valid('admin').required();

/**
 * Collection of download-related Joi validation schemas.
 *
 * @namespace DownloadSchema
 * @type {Object}
 */
export const DownloadSchema = {
    downloadBodySchema,
    downloadParamsSchema,
    deleteDownloadQuerySchema,
};
