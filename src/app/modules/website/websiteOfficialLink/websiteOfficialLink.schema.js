import Joi from "joi";
import { SharedSchema } from "../../../../shared/sharedSchema.js";
import { 
    FILE_EXTENSION_TYPE_PNG, 
    FILE_EXTENSION_TYPE_ICO,
    MIME_TYPE_PNG, 
    MIME_TYPE_JPG,
    MIME_TYPE_ICO
 } from "../../../../constants/constants.js";

const googleMapLocationSchema = Joi.object({
    latitude: Joi.string().min(5).max(255).required().messages({
        'string.base': 'Google Map Location must be a string.',
        'string.min': 'Google Map Location must be at least 5 characters long.',
        'string.max': 'Google Map Location must not exceed 255 characters.',
        'any.required': 'Google Map Location is required.'
    }),
    longitude: Joi.string().min(5).max(255).required().messages({
        'string.base': 'Google Map Location must be a string.',
        'string.min': 'Google Map Location must be at least 5 characters long.',
        'string.max': 'Google Map Location must not exceed 255 characters.',
        'any.required': 'Google Map Location is required.'
    }),
});

/**
 * @typedef {Object} Contact
 * @property {string} address - The address of the website.
 * @property {string} googleMapLocation - Google Map location of the address.
 * @property {string} mobile - Mobile contact number.
 * @property {string} phone - Phone contact number.
 * @property {string} email - Contact email address.
 * @property {string} website - Website URI.
 */
const contactSchema = Joi.object({
    address: Joi.string().min(5).max(255).required().messages({
        'string.base': 'Address must be a string.',
        'string.min': 'Address must be at least 5 characters long.',
        'string.max': 'Address must not exceed 255 characters.',
        'any.required': 'Address is required.'
    }),
    googleMapLocation: googleMapLocationSchema,
    mobile: Joi.string().pattern(new RegExp('^[0-9]{10,15}$')).required().messages({
        'string.base': 'Mobile must be a string.',
        'string.pattern.base': 'Mobile must be a valid phone number with 10-15 digits.',
        'any.required': 'Mobile is required.'
    }),
    phone: Joi.string().pattern(new RegExp('^[0-9]{7,15}$')).required().messages({
        'string.base': 'Phone must be a string.',
        'string.pattern.base': 'Phone must be a valid phone number with 7-15 digits.',
        'any.required': 'Phone is required.'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email must be a valid email address.',
        'any.required': 'Email is required.'
    }),
    website: Joi.string().uri().required().messages({
        'string.uri': 'Website must be a valid URI.',
        'any.required': 'Website is required.'
    })
});

/**
 * @typedef {Object} WebsiteBody
 * @property {string} name - The name of the website.
 * @property {string} slogan - The slogan of the website.
 * @property {string} websiteLogo - The logo of the website.
 * @property {string} websiteFavIcon - The favIcon of the website.
 * @property {contactSchema} contact - The contact information of the website.
 */
const websiteBodySchema = Joi.object({
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
    websiteLogo: SharedSchema.createFileSchema(FILE_EXTENSION_TYPE_PNG, [MIME_TYPE_PNG, MIME_TYPE_JPG]),
    websiteFavIcon: SharedSchema.createFileSchema(FILE_EXTENSION_TYPE_ICO, [MIME_TYPE_ICO]),
    contact: contactSchema
});

/**
 * @namespace WebsiteSchema
 * @description Exported Joi validation schemas for website data.
 *
 * - `websiteBodySchema`: Validates the body data of a website.
 * - `websiteParamsSchema`: Validates the website ID in request parameters.
 */
export const WebsiteOfficialLinkSchema = {
    websiteBodySchema,
};