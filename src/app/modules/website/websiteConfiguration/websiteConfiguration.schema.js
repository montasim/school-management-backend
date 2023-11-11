import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { 
    FILE_EXTENSION_TYPE_PNG, 
    FILE_EXTENSION_TYPE_ICO,
    MIME_TYPE_PNG, 
    MIME_TYPE_JPG,
    MIME_TYPE_ICO
 } from "../../../../constants/constants.js";

/**
 * @typedef {Object} WebsiteBody
 * @property {string} name - The name of the website.
 * @property {string} slogan - The slogan of the website.
 * @property {string} websiteLogo - The logo of the website.
 * @property {string} websiteFavIcon - The favIcon of the website.
 */
const websiteConfigurationBodySchema = Joi.object({
    name: Joi.string().min(1).max(100).required().messages({
        'string.base': 'Name must be a string.',
        'string.min': 'Name must be at least 1 character long.',
        'string.max': 'Name must not exceed 100 characters.',
        'any.required': 'Name is required.'
    }),
    slogan: Joi.string().min(1).max(150).required().messages({
        'string.base': 'Slogan must be a string.',
        'string.min': 'Slogan must be at least 1 character long.',
        'string.max': 'Slogan must not exceed 150 characters.',
        'any.required': 'Slogan is required.'
    }),
    // websiteLogo: JoiSchemaGenerators.fileValidationSchema([FILE_EXTENSION_TYPE_PNG], [MIME_TYPE_PNG, MIME_TYPE_JPG]),
    // websiteFavIcon: JoiSchemaGenerators.fileValidationSchema([FILE_EXTENSION_TYPE_ICO], [MIME_TYPE_ICO]),
});

/**
 * @namespace WebsiteSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteBodySchema`: Validates the body data of a website.
 * - `websiteParamsSchema`: Validates the website ID in request parameters.
 */
export const WebsiteConfigurationSchema = {
    websiteConfigurationBodySchema,
};