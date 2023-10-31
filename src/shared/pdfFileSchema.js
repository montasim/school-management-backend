import Joi from "joi";

/**
 * @description Joi validation schema for download's body data.
 * Validates the title, file object fields which include fieldname,
 * originalname, encoding, mimetype, destination, filename, path, and size.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 200.
 * - `file`: An object that contains information about the file being uploaded.
 *    - `fieldname`: Should be a string and must be 'file'.
 *    - `originalname`: Should be a string with a minimum length of 3 and a maximum length of 200.
 *    - `encoding`: Should be a string and must be '7bit'.
 *    - `mimetype`: Should be a string and must be 'application/pdf'.
 *    - `destination`: Should be a string and must be './uploads'.
 *    - `filename`: Should be a string that matches the pattern /^[0-9]+\.pdf$/.
 *    - `path`: Should be a string that matches the pattern /^uploads\\[0-9]+\.pdf$/.
 *    - `size`: Should be a number not exceeding 5MB (1024 * 1024 * 5).
 */
const pdfFileSchema = Joi.object({
    title: Joi.string().min(3).max(200).required(),
    file: Joi.object({
        fieldname: Joi.string().valid('file').required(),
        originalname: Joi.string().min(3).max(200).required(),
        encoding: Joi.string().valid('7bit').required(),
        mimetype: Joi.string().valid('application/pdf').required(),
        destination: Joi.string().valid('./uploads').required(),
        filename: Joi.string().regex(/^[0-9]+\.pdf$/).required(),
        path: Joi.string().regex(/^uploads\\[0-9]+\.pdf$/).required(),
        size: Joi.number().max(1024 * 1024 * 5).required(),
    }),
});

export default pdfFileSchema;