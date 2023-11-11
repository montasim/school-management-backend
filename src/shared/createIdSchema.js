/**
 * @fileoverview Joi Schema Generator for ID Validation.
 *
 * This module provides a function to create a Joi validation schema specifically for IDs.
 * The schema is dynamically generated based on a specified prefix and ID length constraints
 * defined in the application constants. This function is essential for ensuring that IDs
 * across different entities in the application conform to a uniform format and meet specific
 * length requirements, enhancing data integrity and consistency.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires logger - A logging utility for error logging.
 * @module createIdSchema - Exported function for generating Joi ID validation schemas.
 */

import Joi from "joi";
import logger from "./logger.js";

/**
 * Generates a Joi Validation Schema for IDs.
 *
 * Constructs a Joi string schema to validate ID formats based on a specified prefix, such as 'admin' or 'student'.
 * The function takes into account minimum and maximum length constraints from the provided ID constants.
 * It utilizes regular expressions to ensure that IDs start with the given prefix and are followed by a hyphen
 * and alphanumeric characters, thereby standardizing ID validation across different application components.
 *
 * @param {string} prefix - The prefix used in the ID (e.g., 'admin', 'student').
 * @param ID_CONSTANTS - Constants defining ID length constraints.
 * @returns {Joi.StringSchema} - A Joi schema to validate the ID format and length.
 */
const createIdSchema = (prefix, ID_CONSTANTS) => {
    try {
        const pattern = new RegExp(`^(${prefix})-\\w+$`);

        return Joi.string()
            .pattern(pattern)
            .min(ID_CONSTANTS?.MIN_LENGTH)
            .max(ID_CONSTANTS?.MAX_LENGTH)
    } catch (error) {
        logger.error(error);

        return error;
    }
};

export default createIdSchema;