import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for download's body data.
 */
const downloadBodyValidationSchema = JoiSchemaGenerators.fileTitleValidationSchema();

/**
 * @description Joi validation schema for download's params data.
 */

const downloadParamsValidationSchema = Joi.object({
    fileName: JoiSchemaGenerators.createFileNameSchema([FILE_EXTENSION_TYPE_PDF]),
}).required();

/**
 * @namespace DownloadValidationSchemas
 * @description Exported Joi validation schemas for download data.
 *
 * - `downloadBodySchema`: Validates the body data of a download.
 * - `downloadParamsSchema`: Validates the download ID in request parameters.
 */
export const DownloadValidationSchemas = {
    downloadBodyValidationSchema,
    downloadParamsValidationSchema,
};