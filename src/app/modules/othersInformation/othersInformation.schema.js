import Joi from "joi";
import { ID_CONSTANTS } from './othersInformation.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const othersInformationParamsSchema = Joi.object({
    othersInformationId: createIdSchema(ID_CONSTANTS?.OTHERS_INFORMATION_PREFIX, ID_CONSTANTS?.MIN_LENGTH, ID_CONSTANTS.MAX_LENGTH).required()
});

/**
 * @description Joi validation schema for othersInformation's body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 1000.
 * - `category`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 5000.
 */
const othersInformationBodySchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(1000)
        .required()
        .messages({
            'string.base': '"title" should be a type of "text"',
            'string.empty': '"title" cannot be an empty field',
            'string.min': '"title" should have a minimum length of {#limit}',
            'string.max': '"title" should have a maximum length of {#limit}',
            'any.required': '"title" is a required field'
        }),
    category: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': '"category" should be a type of "text"',
            'string.empty': '"category" cannot be an empty field',
            'string.min': '"category" should have a minimum length of {#limit}',
            'string.max': '"category" should have a maximum length of {#limit}',
            'any.required': '"category" is a required field'
        }),
    description: Joi.string()
        .min(3)
        .max(5000)
        .required()
        .messages({
            'string.base': '"description" should be a type of "text"',
            'string.empty': '"description" cannot be an empty field',
            'string.min': '"description" should have a minimum length of {#limit}',
            'string.max': '"description" should have a maximum length of {#limit}',
            'any.required': '"description" is a required field'
        }),
});

/**
 * @namespace OthersInformationSchema
 * @description Exported Joi validation schemas for othersInformation data.
 *
 * - `othersInformationBodySchema`: Validates the body data of an othersInformation.
 * - `othersInformationParamsSchema`: Validates the othersInformation ID in request parameters.
 * - `deleteOthersInformationQuerySchema`: Validates the admin ID in the query.
 */
export const OthersInformationSchema = {
    othersInformationBodySchema,
    othersInformationParamsSchema,
};