import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { FILE_EXTENSION_TYPE_PDF, MIME_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for routine's body data.
 */
const routineBodySchema = JoiSchemaGenerators.fileWithTitleValidationSchema(FILE_EXTENSION_TYPE_PDF, [MIME_TYPE_PDF]);

/**
 * @description Joi validation schema for routine's params data.
 */

const routineParamsSchema = Joi.object({
    // The unique filename with a valid extension
    fileName: JoiSchemaGenerators.createFileNameSchema(FILE_EXTENSION_TYPE_PDF),
}).required();

/**
 * @namespace RoutineSchema
 * @description Exported Joi validation schemas for routine data.
 *
 * - `routineBodySchema`: Validates the body data of a routine.
 * - `routineParamsSchema`: Validates the routine ID in request parameters.
 */
export const RoutineSchema = {
    routineBodySchema,
    routineParamsSchema,
};