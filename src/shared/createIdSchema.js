/**
 * @fileoverview Joi Schema Generator for ID Validation.
 *
 * This module exports a function to create Joi validation schemas for IDs, ensuring that they conform to a specified format.
 * The schema is tailored based on a provided prefix and ID length constraints, which are critical for maintaining consistent
 * ID formats across various entities in the application. This approach enhances data integrity and consistency in ID validation.
 *
 * @module createIdSchema - Exports a function for generating Joi schemas to validate ID formats.
 * @requires Joi - Library used for schema definition and data validation.
 * @requires logger - Utility for logging errors.
 */

import Joi from "joi";
import logger from "./logger.js";

/**
 * Creates a Joi String Schema for Validating IDs.
 *
 * This function constructs a Joi string schema for ID validation, incorporating a specific prefix and length constraints.
 * The generated schema uses a regular expression to ensure that the IDs start with the given prefix, followed by a hyphen
 * and a sequence of alphanumeric characters. The function is flexible to accommodate different prefix requirements and length
 * constraints, making it a versatile tool for standardizing ID validation in various parts of the application.
 *
 * @param {string} prefix - The prefix for the ID, like 'admin', 'student', etc.
 * @param {number} minimumLength - The minimum allowed length for the ID.
 * @param {number} maximumLength - The maximum allowed length for the ID.
 * @returns {Joi.StringSchema} - A Joi string schema for validating ID formats and lengths.
 */
const createIdSchema = (prefix, minimumLength, maximumLength) => {
    try {
        // Define the pattern for ID validation based on the prefix
        const pattern = new RegExp(`^(${prefix})-\\w{6}$`);

        // Return the Joi string schema with the defined pattern and length constraints
        return Joi.string()
            .pattern(pattern)
            .min(minimumLength)
            .max(maximumLength)
            .messages({
                'string.base': `"${prefix}Id" should be a type of 'text'`,
                'string.empty': `"${prefix}Id" cannot be an empty field`,
                'string.min': `"${prefix}Id" should have a minimum length of ${minimumLength}`,
                'string.max': `"${prefix}Id" should have a maximum length of ${maximumLength}`,
                'any.required': `"${prefix}Id" is a required field`,
                'string.pattern.base': `Invalid "${prefix}Id"`
            });
    } catch (error) {
        // Log any errors encountered during schema creation
        logger.error(error);
        return error;
    }
};

export default createIdSchema;