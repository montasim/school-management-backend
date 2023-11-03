import Joi from "joi";

/**
 * Joi schema for validating the creation of a new notice.
 * It expects a 'title', 'file', and 'adminId' properties in the request body.
 *
 * @type {Joi.ObjectSchema}
 * @constant
 */
const noticeBodySchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
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
    adminId: Joi.string().min(3).max(20).required(),
});

/**
 * Joi schema for validating the retrieval of a notice by its ID.
 * The schema ensures that the provided ID is a string of minimum length 3 and maximum length 60.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const noticeParamsSchema = Joi.string().min(3).max(60).required();

/**
 * Joi schema to validate the delete notice query parameter.
 *
 * This schema ensures that the provided query parameter is a string and
 * matches the value 'admin'. This schema is used primarily to
 * determine the role or type of user attempting to delete a notice.
 *
 * @type {Joi.ObjectSchema<string>}
 * @constant
 */
const deleteNoticeQuerySchema = Joi.string().valid('admin').required();

/**
 * Collection of notice-related Joi validation schemas.
 *
 * @namespace NoticeSchema
 * @type {Object}
 */
export const NoticeSchema = {
    noticeBodySchema,
    noticeParamsSchema,
    deleteNoticeQuerySchema,
};
