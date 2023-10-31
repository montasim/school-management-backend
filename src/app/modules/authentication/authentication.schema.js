import Joi from "joi";
import { ID_CONSTANTS } from './authentication.constants.js';

/**
 * @description Joi validation schema for signup body data.
 * Validates the name and password fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `password`: Should be a string with a minimum length of 8 and a maximum length of 20.
 */
const loginSchema = Joi.object({
    userName: Joi.string().min(3).max(ID_CONSTANTS?.MAX_LENGTH).required(),
    password: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
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
    name: Joi.string().min(3).max(30).required(),
    userName: Joi.string().min(3).max(ID_CONSTANTS?.MAX_LENGTH).required(),
    password: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
    confirmPassword: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
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
    oldPassword: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
    newPassword: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
    confirmNewPassword: Joi.string().min(ID_CONSTANTS?.MIN_LENGTH).max(ID_CONSTANTS?.MAX_LENGTH).required(),
});

/**
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
