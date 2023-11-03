import { SharedSchema } from "../../../shared/sharedSchema.js";

/**
 * @description Joi validation schema for download's body data.
 * Validates the title, file object fields which include fieldname,
 * originalname, encoding, mimetype, destination, filename, path, and size.
 */
const downloadBodySchema = SharedSchema.pdfFileSchema;
const downloadParamsSchema = SharedSchema.downloadParamsSchema;

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