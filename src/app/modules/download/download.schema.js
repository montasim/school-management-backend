import Joi from "joi";
import pdfFileSchema from "../../../shared/pdfFileSchema.js";

const downloadParamsSchema = Joi.object({
    fileName: Joi.string().min(3).max(200).pattern(/^[a-zA-Z\s]+-\d{13}\.pdf$/, 'filename pattern')
        .message("Filename must be in the format 'NAME-TIMESTAMP.pdf'"),
});

/**
 * @description Joi validation schema for download's body data.
 * Validates the title, file object fields which include fieldname,
 * originalname, encoding, mimetype, destination, filename, path, and size.
 */
const downloadBodySchema = pdfFileSchema;

/**
 * @namespace DownloadSchema
 * @description Exported Joi validation schemas for download data.
 *
 * - `downloadBodySchema`: Validates the body data of a download.
 * - `downloadParamsSchema`: Validates the download ID in request parameters.
 */
export const DownloadSchema = {
    downloadBodySchema,
    downloadParamsSchema,
};