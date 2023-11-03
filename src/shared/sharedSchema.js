import Joi from "joi";

/**
 * Generates a Joi schema for validating PDF files.
 *
 * @type {Joi.ObjectSchema}
 */
const pdfFileSchema = Joi.object({
    // Title of the file, used for identification
    title: Joi.string()
        .min(1)
        .max(255)
        .required()
        .description('Title of the file, used for identification.'),

    // The unique filename with a valid extension
    uniqueFileName: Joi.string()
        .min(1)
        .max(255)
        .required()
        .pattern(/^(.*\.(pdf))?$/i)
        .description('The unique filename with a valid extension.'),

    // The base64 encoded data of the file
    fileBuffer: Joi.string()
        .base64()
        .required()
        .description('The base64 encoded data of the file.'),

    // MIME type of the file
    mimeType: Joi.string()
        .valid("application/pdf")
        .required()
        .description('MIME type of the file.')
}).required();

/**
 * Schema for validating download parameters.
 *
 * @typedef {Object} DownloadParams
 * @property {string} fileName - The name of the file. Must contain only alphanumeric characters,
 * underscores, spaces, hyphens, and must end with ".pdf". Min length: 5, Max length: 255.
 */
const downloadParamsSchema = Joi.object({
    // Define the fileName schema
    fileName: Joi.string()
        .required()
        .regex(/^[a-zA-Z\s]+-\d{13}\.pdf$/)
        .message('File name must contain only alphanumeric characters, underscores, spaces, hyphens, and must end with ".pdf".')
        .max(255)
        .message('File name must not exceed 255 characters.')
        .min(5)
        .message('File name must be at least 5 characters long.')
});

/**
 * Shared Joi schemas for file validation.
 *
 * @type {Object}
 * @property {Joi.ObjectSchema} pdfFileSchema - Schema for validating PDF files.
 * @property {Joi.ObjectSchema} downloadParamsSchema - Schema for validating download parameters.
 */
export const SharedSchema = {
    pdfFileSchema,
    downloadParamsSchema
};