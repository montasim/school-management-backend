import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * @typedef {Object} Link
 * @property {string} title - The title of the link.
 * @property {string} link - The URL of the link.
 */
const websiteOfficialLinkSchema = Joi.object({
    officialLinkTitle: JoiSchemaGenerators.titleValidationSchema,
    officialLink: JoiSchemaGenerators.uriValidationSchema
});

const websiteOfficial = Joi.array().items(websiteOfficialLinkSchema).messages({
    'array.base': 'officialLinks must be an array.'
});

const websiteOfficialLinkBodySchema = Joi.object({
    officialLinks: websiteOfficial
});

/**
 * @namespace WebsiteOfficialLinkSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteOfficialLinkBodySchema`: Validates the body data of a website.
 */
export const WebsiteOfficialLinkSchema = {
    websiteOfficialLinkBodySchema,
};