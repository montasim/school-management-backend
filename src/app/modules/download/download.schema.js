import Joi from "joi";
import { SharedSchema } from "../../../shared/sharedSchema.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for download's body data.
 */
const downloadBodySchema = SharedSchema.createFileWithTitleSchema(FILE_EXTENSION_TYPE_PDF);

/**
 * @description Joi validation schema for download's params data.
 */

const downloadParamsSchema = Joi.object({
    // The unique filename with a valid extension
    fileName: SharedSchema.createFileNameSchema(FILE_EXTENSION_TYPE_PDF),
}).required();

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