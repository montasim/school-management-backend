/**
 * @fileoverview Joi Validation Schemas for Send Email Data.
 *
 * This module provides a Joi schema for validating the body data of email-sending requests in the application.
 * It includes detailed validation rules for fields such as the sender's first and last names, phone number, email address,
 * subject, and message. This schema ensures that incoming data for sending emails conforms to the expected format and
 * content constraints, enhancing data integrity and consistency. It uses Joi built-in validation methods and custom
 * error messages to provide clear feedback on any validation failures. Centralizing this schema in a single module
 * allows for consistent and reusable validation logic across different parts of the application that handle email operations.
 *
 * @requires Joi - Library for schema description and data validation.
 * @module ContactSchema - Exported Joi validation schema for send email data.
 */

import Joi from "joi";
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import { CONTACT_CONSTANTS } from "./contact.constants.js";

/**
 * @description Joi validation schema for send email's body data.
 * Validates the firstName, lastName, phone, email, subject, and message fields.
 *
 * - `firstName`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `lastName`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `phone`: Required field with no specific validations.
 * - `email`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `subject`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `message`: Should be a string with a minimum length of 3 and a maximum length of 500.
 */
const sendEmailBodySchema = Joi.object({
    firstName: JoiSchemaGenerators.createStringSchema(
        'firstName',
        CONTACT_CONSTANTS?.PROPERTY_FIRST_NAME_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_FIRST_NAME_MAX_LENGTH
    ).required(),
    lastName: JoiSchemaGenerators.createStringSchema(
        'lastName',
        CONTACT_CONSTANTS?.PROPERTY_LAST_NAME_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_LAST_NAME_MAX_LENGTH
    ).required(),
    phone: Joi.string()
        .pattern(/^(?:\+880)?01[3-9]\d{8}$/)
        .min(CONTACT_CONSTANTS?.PROPERTY_PHONE_MIN_LENGTH)
        .max(CONTACT_CONSTANTS?.PROPERTY_PHONE_MAX_LENGTH)
        .required()
        .messages({
            'string.pattern.base': '"phone" must be a valid Bangladeshi phone number (country code +880 is optional)',
            'string.min': '"phone" should have a minimum length of 10 characters (without country code)',
            'string.max': '"phone" should have a maximum length of 14 characters (with country code +880)',
            'any.required': '"phone" is a required field',
        }),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .regex(/^((?!tempmail|mailinator|yopmail).)*$/, 'no-temp-email')
        .min(CONTACT_CONSTANTS?.PROPERTY_EMAIL_MIN_LENGTH)
        .max(CONTACT_CONSTANTS?.PROPERTY_EMAIL_MAX_LENGTH)
        .required()
        .messages({
            'string.email': '"email" must be a valid email address',
            'string.min': '"email" should have a minimum length of {#limit}',
            'string.max': '"email" should have a maximum length of {#limit}',
            'string.pattern.name': '"email" must not be a temporary email address',
            'string.regex.no-temp-email': '"email" must not be from a temporary email provider (like tempmail, mailinator, or yopmail)',
            'any.required': '"email" is a required field',
        }),
    subject: JoiSchemaGenerators.createStringSchema(
        'subject',
        CONTACT_CONSTANTS?.PROPERTY_SUBJECT_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_SUBJECT_MAX_LENGTH
    ).required(),
    message: JoiSchemaGenerators.createStringSchema(
        'message',
        CONTACT_CONSTANTS?.PROPERTY_MESSAGE_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_MESSAGE_MAX_LENGTH
    ).required(),
});

/**
 * @namespace SendEmailSchema
 * @description Exported Joi validation schemas for send email data.
 *
 * - `sendEmailBodySchema`: Validates the body data of a send email.
 * - `sendEmailParamsSchema`: Validates the sendEmailToDefaultEmailAddress ID in request parameters.
 */
export const ContactSchema = {
    sendEmailBodySchema,
};