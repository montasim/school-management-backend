import Joi from "joi";
import logger from "./logger.js";

/**
 * @function createIdSchema
 * @description Creates a Joi validation schema for ID strings based on the given prefix.
 *
 * @param {string} prefix - The prefix for the ID (e.g., "admin" or "student").
 * @param ID_CONSTANTS
 * @returns {Joi.StringSchema} The Joi validation schema for the ID.
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