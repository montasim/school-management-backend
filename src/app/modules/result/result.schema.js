import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF, MIME_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for result's body data.
 */
const resultBodySchema = JoiSchemaGenerators.fileWithTitleValidationSchema(FILE_EXTENSION_TYPE_PDF, [MIME_TYPE_PDF]);

/**
 * @description Joi validation schema for result's params data.
 */

const resultParamsSchema = Joi.object({
    // The unique filename with a valid extension
    fileName: JoiSchemaGenerators.createFileNameSchema(FILE_EXTENSION_TYPE_PDF),
}).required();

/**
 * @namespace ResultSchema
 * @description Exported Joi validation schemas for result data.
 *
 * - `resultBodySchema`: Validates the body data of a result.
 * - `resultParamsSchema`: Validates the result ID in request parameters.
 */
export const ResultSchema = {
    resultBodySchema,
    resultParamsSchema,
};