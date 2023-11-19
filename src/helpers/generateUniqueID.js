/**
 * @fileoverview generateUniqueID.js
 *
 * This module exports a function for generating unique IDs with a given prefix
 * and a random suffix. It uses the 'uuid' library to create random UUIDs and
 * extracts a portion of it to form the unique ID.
 *
 * @module generateUniqueID
 */

import {v4 as uuidv4} from 'uuid';
import logger from "../shared/logger.js";

/**
 * Generates a unique ID with the given prefix and a random suffix.
 *
 * @param {string} prefix - The prefix to be included in the ID.
 * @returns {string} - The generated unique ID.
 */
function generateUniqueID(prefix = "undefined") {
    try {
        // Generate a random UUID
        const randomUUID = uuidv4();

        // Extract the first 6 characters from the random UUID as the suffix
        const randomSuffix = randomUUID.substring(0, 6);

        // Combine the prefix and random suffix to create the unique ID
        return `${prefix}-${randomSuffix}`;
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default generateUniqueID;