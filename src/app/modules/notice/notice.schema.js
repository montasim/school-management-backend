import Joi from "joi";
import { SharedSchema } from "../../../shared/sharedSchema.js";
import { FILE_EXTENSION_TYPE_PDF } from "../../../constants/constants.js";

/**
 * @description Joi validation schema for notice's body data.
 */
const noticeBodySchema = SharedSchema.createFileSchema(FILE_EXTENSION_TYPE_PDF);

/**
 * @description Joi validation schema for notice's params data.
 */

const noticeParamsSchema = Joi.object({
    // The unique filename with a valid extension
    fileName: SharedSchema.createFileNameSchema(FILE_EXTENSION_TYPE_PDF),
}).required();

/**
 * @namespace NoticeSchema
 * @description Exported Joi validation schemas for notice data.
 *
 * - `noticeBodySchema`: Validates the body data of a notice.
 * - `noticeParamsSchema`: Validates the notice ID in request parameters.
 */
export const NoticeSchema = {
    noticeBodySchema,
    noticeParamsSchema,
};