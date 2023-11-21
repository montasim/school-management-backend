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
    phone: JoiSchemaGenerators?.createMobileNumberSchema(
        "phone",
        CONTACT_CONSTANTS?.PROPERTY_PHONE_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_PHONE_MAX_LENGTH
    ),
    email: JoiSchemaGenerators?.createEmailSchema(
        CONTACT_CONSTANTS?.PROPERTY_EMAIL_MIN_LENGTH,
        CONTACT_CONSTANTS?.PROPERTY_EMAIL_MAX_LENGTH,
    ),
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