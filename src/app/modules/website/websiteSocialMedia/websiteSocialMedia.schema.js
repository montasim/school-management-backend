import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * @typedef {Object} Link
 * @property {string} title - The title of the link.
 * @property {string} link - The URL of the link.
 */
const websiteSocialMediaSchema = Joi.object({
    socialMediaTitle: JoiSchemaGenerators.titleValidationSchema,
    socialMediaLink: JoiSchemaGenerators.uriValidationSchema
});

const websiteOfficial = Joi.array().items(websiteSocialMediaSchema).messages({
    'array.base': 'socialMediaLinks must be an array.'
});

const websiteSocialMediaBodySchema = Joi.object({
    socialMediaLinks: websiteOfficial
});

/**
 * @namespace WebsiteSocialMediaSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteSocialMediaBodySchema`: Validates the body data of a website.
 */
export const WebsiteSocialMediaSchema = {
    websiteSocialMediaBodySchema,
};