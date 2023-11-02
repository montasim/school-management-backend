import Joi from "joi";

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
    firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': '"firstName" should have a minimum length of {#limit}',
            'string.max': '"firstName" should have a maximum length of {#limit}',
            'any.required': '"firstName" is a required field',
        }),
    lastName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
            'string.min': '"lastName" should have a minimum length of {#limit}',
            'string.max': '"lastName" should have a maximum length of {#limit}',
            'any.required': '"lastName" is a required field',
        }),
    phone: Joi.string()
        .pattern(/^[0-9+\-().\s]+$/)
        .required()
        .messages({
            'string.pattern.base': '"phone" must be a valid phone number',
            'any.required': '"phone" is a required field',
        }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5)
        .max(30)
        .required()
        .messages({
            'string.email': '"email" must be a valid email address',
            'string.min': '"email" should have a minimum length of {#limit}',
            'string.max': '"email" should have a maximum length of {#limit}',
            'any.required': '"email" is a required field',
        }),
    subject: Joi.string()
        .min(3)
        .max(300)
        .required()
        .messages({
            'string.min': '"subject" should have a minimum length of {#limit}',
            'string.max': '"subject" should have a maximum length of {#limit}',
            'any.required': '"subject" is a required field',
        }),
    message: Joi.string()
        .min(3)
        .max(3000)
        .required()
        .messages({
            'string.min': '"message" should have a minimum length of {#limit}',
            'string.max': '"message" should have a maximum length of {#limit}',
            'any.required': '"message" is a required field',
        }),
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
