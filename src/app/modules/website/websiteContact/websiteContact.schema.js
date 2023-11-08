import Joi from "joi";

/**
 * Schema definition for validating Google Map location input.
 * Ensures that latitude and longitude are provided as strings
 * with a minimum length of 5 and a maximum length of 255 characters.
 */
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
 * Schema for contact information of a website.
 * This includes validation for address, Google Map location object,
 * mobile and phone numbers, email, and website URI.
 */
const websiteContactBodySchema = Joi.object({
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
 * Namespace for website contact schema.
 * Exports the Joi validation schema for website contact information.
 * Can be used to validate the contact section of a website configuration.
 *
 * @namespace WebsiteContactSchema
 */
export const WebsiteContactSchema = {
    websiteContactBodySchema,
};