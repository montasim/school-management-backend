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

import Joi from "../../../../helpers/websiteValidator.js";
import { JoiSchemaGenerators } from "../../../../shared/joiSchemaGenerators.js";
import { WEBSITE_CONTACT_CONSTANTS } from "./websiteContact.constants.js";

/**
 * Joi Schema for Google Map Location.
 *
 * Validates the structure of the Google Map location data. Ensures that both
 * latitude and longitude are provided as strings, with appropriate character
 * length constraints. This schema is used as part of the website contact
 * information to validate the location coordinates.
 */
const googleMapLocationSchema = Joi.object({
    latitude: JoiSchemaGenerators.createStringSchema(
        "latitude",
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_LATITUDE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_LATITUDE_MAX_LENGTH
    ),
    longitude: JoiSchemaGenerators.createStringSchema(
        "longitude",
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_LONGITUDE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_LONGITUDE_MAX_LENGTH
    ),
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
const websiteNewContactValidationSchema = Joi.object({
    address: JoiSchemaGenerators.createStringSchema(
        'address',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_ADDRESS_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_ADDRESS_MAX_LENGTH
    ).required(),
    googleMapLocation: googleMapLocationSchema.required(),
    mobile: JoiSchemaGenerators.createMobileNumberSchema(
        'mobile',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_MOBILE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_MOBILE_MAX_LENGTH
    ).required(),
    phone: JoiSchemaGenerators.createMobileNumberSchema(
        'phone',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_PHONE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_PHONE_MAX_LENGTH
    ).required(),
    email: JoiSchemaGenerators.createEmailSchema(
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_EMAIL_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_EMAIL_MAX_LENGTH
    ).required(),
    website: Joi.website().required(),
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
const websiteUpdateContactValidationSchema = Joi.object({
    address: JoiSchemaGenerators.createStringSchema(
        'address',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_ADDRESS_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_ADDRESS_MAX_LENGTH
    ),
    googleMapLocation: googleMapLocationSchema,
    mobile: JoiSchemaGenerators.createMobileNumberSchema(
        'mobile',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_MOBILE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_MOBILE_MAX_LENGTH
    ),
    phone: JoiSchemaGenerators.createMobileNumberSchema(
        'phone',
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_PHONE_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_PHONE_MAX_LENGTH
    ),
    email: JoiSchemaGenerators.createEmailSchema(
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_EMAIL_MIN_LENGTH,
        WEBSITE_CONTACT_CONSTANTS?.PROPERTY_EMAIL_MAX_LENGTH
    ),
    website: Joi.website(),
});

/**
 * Namespace for website contact schema.
 * Exports the Joi validation schema for website contact information.
 * Can be used to validate the contact section of a website configuration.
 *
 * @namespace WebsiteContactSchema
 */
export const WebsiteContactSchema = {
    websiteNewContactValidationSchema,
    websiteUpdateContactValidationSchema
};