/**
 * @fileoverview Website Contact Joi Schemas.
 *
 * This file defines Joi schemas for validating website contact information.
 * It includes schemas for various contact details such as address, mobile and
 * phone numbers, email, and website URI, as well as the Google Map location
 * object. These schemas are crucial for ensuring that the contact information
 * provided for a website is valid and adheres to specific standards and formats.
 *
 * @requires Joi - A powerful schema description language and data validator for JavaScript.
 * @requires JoiSchemaGenerators - Shared Joi schema generators used for creating standardized validation schemas.
 * @module WebsiteContactSchema - Exports Joi validation schemas for website contact information.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";

/**
 * Joi Schema for Google Map Location.
 *
 * Validates the structure of the Google Map location data. Ensures that both
 * latitude and longitude are provided as strings, with appropriate character
 * length constraints. This schema is used as part of the website contact
 * information to validate the location coordinates.
 */
const googleMapLocationSchema = Joi.object({
    latitude: JoiSchemaGenerators.createStringSchema("latitude", 3, 20),
    longitude: JoiSchemaGenerators.createStringSchema("longitude", 3, 20),
});

/**
 * Joi Schema for Website Contact Information.
 *
 * This schema validates the contact details of a website. It includes
 * validations for address, Google Map location (latitude and longitude),
 * mobile and phone numbers, email address, and website URL. Each field is
 * validated to ensure it meets specific criteria like length, format, and
 * data type, providing comprehensive validation for website contact data.
 */
const websiteContactBodySchema = Joi.object({
    address: JoiSchemaGenerators.createStringSchema("address", 5, 255),
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
    email: JoiSchemaGenerators.createStringSchema("email", 1, 50).email(),
    website: JoiSchemaGenerators.createStringSchema("website", 1, 50).uri(),
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