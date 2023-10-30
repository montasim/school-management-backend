import Joi from "joi";

/**
 * Joi schema for validating the contact body.
 * It expects a 'name' and 'requestedBy' properties in the request body.
 * @constant {Object}
 */
const contactBodySchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).max(30).required(),
    phone: Joi.required(),
    email: Joi.string().min(3).max(30).required(),
    subject: Joi.string().min(3).max(100).required(),
    message: Joi.string().min(3).max(500).required(),  
});

/**
 * Collection of contact-related Joi validation schemas.
 * @namespace ContactSchema
 * @type {Object}
 */
export const ContactSchema = {
    contactBodySchema,
};
