import Joi from "joi";

/**
 * @module AuthenticationSchema
 * @description This module provides schemas for validating authentication related data.
 */

/**
 * Pattern for admin ID.
 * @constant {RegExp}
 */
const adminIdPattern = /^(admin)-\w+$/;

/**
 * Schema for validating admin IDs.
 * @constant {Object}
 */
const idSchema = Joi.string().pattern(adminIdPattern).min(9).max(30);

/**
 * Schema for validating login requests.
 * @constant {Object}
 */
const loginSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
});

/**
 * Schema for validating signup requests.
 * @constant {Object}
 */
const signupSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirmPassword: Joi.string().min(3).max(20).required(),
});

/**
 * Schema for validating authentication parameters (admin ID).
 * @constant {Object}
 */
const authenticationParamsSchema = idSchema.required();

/**
 * Schema for validating password reset requests.
 * @constant {Object}
 */
const resetPasswordSchema = Joi.object({
    userName: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirmPassword: Joi.string().min(3).max(20).required(),
});

/**
 * Schema for validating deletion queries for admin.
 * @constant {Object}
 */
const deleteAdminQuerySchema = Joi.string().required();

/**
 * @typedef {Object} AuthenticationSchemas
 * @property {Object} loginSchema - Schema for login validation.
 * @property {Object} signupSchema - Schema for signup validation.
 * @property {Object} authenticationParamsSchema - Schema for admin ID validation.
 * @property {Object} resetPasswordSchema - Schema for password reset validation.
 * @property {Object} deleteAdminQuerySchema - Schema for validating delete admin queries.
 */
export const AuthenticationSchema = {
    loginSchema,
    signupSchema,
    authenticationParamsSchema,
    resetPasswordSchema,
    deleteAdminQuerySchema,
};
