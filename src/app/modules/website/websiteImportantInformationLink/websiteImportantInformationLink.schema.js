import Joi from "joi";
import { SharedSchema } from "../../../../shared/sharedSchema.js";

/**
 * @typedef {Object} Link
 * @property {string} title - The title of the link.
 * @property {string} link - The URL of the link.
 */
const websiteImportantInformationLinkSchema = Joi.object({
    importantInformationLinkTitle: SharedSchema.titleSchema,
    importantInformationLink: SharedSchema.linkSchema
});

const websiteImportantInformation = Joi.array().items(websiteImportantInformationLinkSchema).messages({
    'array.base': 'importantInformationLinks must be an array.'
});

const websiteImportantInformationLinkBodySchema = Joi.object({
    importantInformationLinks: websiteImportantInformation
});

/**
 * @namespace WebsiteImportantInformationLinkSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteImportantInformationLinkBodySchema`: Validates the body data of a website.
 */
export const WebsiteImportantInformationLinkSchema = {
    websiteImportantInformationLinkBodySchema,
};