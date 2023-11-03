import Joi from "joi";
import { ID_CONSTANTS, IMAGE_PATTERN } from './administration.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const administrationParamsSchema = Joi.object({
    administrationId: createIdSchema(ID_CONSTANTS?.ADMINISTRATION_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for administration's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const administrationBodySchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    category: Joi.array().items(Joi.string()).required(),
    designation: Joi.string().min(2).max(20).required(),
    image: Joi.string().pattern(IMAGE_PATTERN).required(),
});

/**
 * @namespace AdministrationSchema
 * @description Exported Joi validation schemas for administration data.
 *
 * - `administrationBodySchema`: Validates the body data of an administration.
 * - `administrationParamsSchema`: Validates the administration ID in request parameters.
 * - `deleteAdministrationQuerySchema`: Validates the admin ID in the query.
 */
export const AdministrationSchema = {
    administrationBodySchema,
    administrationParamsSchema,
};