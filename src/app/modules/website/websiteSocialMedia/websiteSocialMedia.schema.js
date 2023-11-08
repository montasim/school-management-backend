import Joi from "joi";
import { SharedSchema } from "../../../../shared/sharedSchema.js";

/**
 * @typedef {Object} Link
 * @property {string} title - The title of the link.
 * @property {string} link - The URL of the link.
 */
const websiteSocialMediaSchema = Joi.object({
    socialMediaTitle: SharedSchema.titleSchema,
    socialMediaLink: SharedSchema.linkSchema
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