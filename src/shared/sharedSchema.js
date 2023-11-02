import Joi from "joi";

/**
 * @typedef {Object} FileSchema
 * @property {string} title - The title of the file. Min length: 3, Max length: 200.
 * @property {Object} file - The file object containing details of the uploaded file.
 * @property {string} file.fieldname - The field name. Should always be 'file'.
 * @property {string} file.originalname - Original name of the file. Min length: 3, Max length: 200.
 * @property {string} file.encoding - The encoding type. Should always be '7bit'.
 * @property {string} file.mimetype - The MIME type. Should always be 'application/pdf'.
 * @property {string} file.destination - The destination path. Should always be './uploads'.
 * @property {string} file.filename - The saved filename. Must match the pattern /^[0-9]+\.pdf$/.
 * @property {string} file.path - The path where the file is saved. Must match the pattern /^uploads\\[0-9]+\.pdf$/.
 * @property {number} file.size - The size of the file. Must not exceed 5MB.
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

/**
 * @typedef {Object} DownloadParams
 * @property {string} fileName - The name of the file.
 * Must contain only alphanumeric characters, underscores, spaces, hyphens, and must end with ".pdf".
 * Min length: 5, Max length: 255.
 */
const downloadParamsSchema = Joi.object({
    fileName: Joi.string()
        .required()
        .regex(/^[a-zA-Z\s]+-\d{13}\.pdf$/)
        .message('File name must contain only alphanumeric characters, underscores, spaces, hyphens, and must end with ".pdf".')
        .max(255)
        .message('File name must not exceed 255 characters.')
        .min(5)
        .message('File name must be at least 5 characters long.')
});

export const SharedSchema = {
    pdfFileSchema,
    downloadParamsSchema
};
