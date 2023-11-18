import Joi from "joi";
import { ID_CONSTANTS } from './designation.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const designationParamsSchema = Joi.object({
    designationId: createIdSchema(ID_CONSTANTS?.LEVEL_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS?.MAX_LENGTH).required()
});

/**
 * @description Joi validation schema for designation's body data.
 * Validates the name, designation, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `designation`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const designationBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
});

/**
 * @namespace DesignationSchema
 * @description Exported Joi validation schemas for designation data.
 *
 * - `designationBodySchema`: Validates the body data of a designation.
 * - `designationParamsSchema`: Validates the designation ID in request parameters.
 */
export const DesignationSchema = {
    designationBodySchema,
    designationParamsSchema,
};