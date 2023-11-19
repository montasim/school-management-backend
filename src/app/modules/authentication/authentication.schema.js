/**
 * @fileoverview Joi Validation Schemas for Authentication.
 *
 * This module defines Joi validation schemas for handling authentication-related data.
 * It provides structured and secure validation for login, signup, and password reset requests.
 * The schemas enforce specific formatting and length requirements for user credentials,
 * ensuring data integrity and adherence to security standards. This module is crucial for
 * validating user input during authentication processes, thereby enhancing the overall
 * security and robustness of the application's authentication system.
 *
 * @module AuthenticationSchema - Exported Joi validation schemas for authentication data.
 * @requires Joi - Library for schema description and data validation.
 * @requires ID_CONSTANTS - Constants defining ID properties and constraints.
 */

import Joi from "joi";
import { ADMIN_CONSTANTS } from './authentication.constants.js';
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";

/**
 * @description Joi validation schema for signup body data.
 * Validates the name and password fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `password`: Should be a string with a minimum length of 8 and a maximum length of 20.
 */
const loginSchema = Joi.object({
    userName: JoiSchemaGenerators.createStringSchema(
        'userName',
        ADMIN_CONSTANTS?.PROPERTY_USERNAME_MIN_LENGTH,
        ADMIN_CONSTANTS?.PROPERTY_USERNAME_MAX_LENGTH
    ).required(),
    password: JoiSchemaGenerators.createStringSchema(
        'password',
        ADMIN_CONSTANTS?.PROPERTY_PASSWORD_MIN_LENGTH,
        ADMIN_CONSTANTS?.PROPERTY_PASSWORD_MAX_LENGTH
    ).required(),
});

/**
 * @description Joi validation schema for signup body data.
 * Validates the name, userName, password, and confirmPassword fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `userName`: Should be a string with a minimum length of 3 and a maximum length of 20.
 * - `password`: Should be a string with a minimum length of 8 and a maximum length of 20.
 * - `confirmPassword`: Should be a string with a minimum length of 8 and a maximum length of 20.
 */
const signupSchema = Joi.object({
    name: JoiSchemaGenerators.createStringSchema(
        'name',
        ADMIN_CONSTANTS?.PROPERTY_NAME_MIN_LENGTH,
        ADMIN_CONSTANTS?.PROPERTY_NAME_MAX_LENGTH
    ).required(),
    userName: JoiSchemaGenerators.createStringSchema(
        'userName',
        ADMIN_CONSTANTS?.PROPERTY_USERNAME_MIN_LENGTH,
        ADMIN_CONSTANTS?.PROPERTY_USERNAME_MAX_LENGTH
    ).required(),
    password: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8-30 characters long, include uppercase and lowercase letters, numbers, and special characters (@$!%*?&).',
            'any.required': 'Password is required.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password must be no more than 30 characters long.'
        }),
    confirmPassword: Joi.string()
        .valid(Joi.ref('password'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is required.'
        })
});

/**
 * @description Joi validation schema for reset password body data.
 * Validates the userName, password, and confirmPassword fields.
 *
 * - `userName`: Should be a string with a minimum length of 3 and a maximum length of 20.
 * - `password`: Should be a string with a minimum length of 8 and a maximum length of 20.
 * - `confirmPassword`: Should be a string with a minimum length of 8 and a maximum length of 20.
 */
const resetPasswordSchema = Joi.object({
    oldPassword: JoiSchemaGenerators.createStringSchema(
        'oldPassword',
        ADMIN_CONSTANTS?.PROPERTY_PASSWORD_MIN_LENGTH,
        ADMIN_CONSTANTS?.PROPERTY_PASSWORD_MAX_LENGTH
    ).required(),
    newPassword: Joi.string()
        .pattern(new RegExp(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/))
        .required()
        .messages({
            'string.pattern.base': 'Password must be 8-30 characters long, include uppercase and lowercase letters, numbers, and special characters (@$!%*?&).',
            'any.required': 'Password is required.',
            'string.empty': 'Password cannot be empty.',
            'string.min': 'Password must be at least 8 characters long.',
            'string.max': 'Password must be no more than 30 characters long.'
        }),
    confirmNewPassword: Joi.string()
        .valid(Joi.ref('newPassword'))
        .required()
        .messages({
            'any.only': 'Confirm password must match the password.',
            'any.required': 'Confirm password is required.'
        })
});

/**
 * Exported object containing all defined authentication schemas.
 * These schemas are used for validating user input during login, signup, and password reset processes.
 *
 * @typedef {Object} AuthenticationSchemas
 * @property {Object} loginSchema - Schema for login validation.
 * @property {Object} signupSchema - Schema for signup validation.
 * @property {Object} resetPasswordSchema - Schema for password reset validation.
 */
export const AuthenticationSchema = {
    loginSchema,
    signupSchema,
    resetPasswordSchema,
};