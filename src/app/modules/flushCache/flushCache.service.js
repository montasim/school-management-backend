import NodeCache from "node-cache";

import {
    FORBIDDEN_MESSAGE,
    STATUS_FORBIDDEN,
    STATUS_OK,
} from "../../../constants/constants.js";
import logger from "../../../shared/logger.js";

import isValidRequest from "../../../shared/isValidRequest.js";
import generateResponseData from "../../../shared/generateResponseData.js";

const cache = new NodeCache();

/**
 * Deletes a specific flushCache by fileName from the database.
 *
 * @async
 * @param {Object} db - DatabaseMiddleware connection object.
 * @param {string} adminId - The user fileName making the request.
 * @returns {Object} - A confirmation message or an error message.
 * @throws {Error} Throws an error if any.
 */
const deleteFlushCacheService = async (db, adminId) => {
    try {
        if (!await isValidRequest(db, adminId))
            return generateResponseData({}, false, STATUS_FORBIDDEN, FORBIDDEN_MESSAGE);

        cache.flushAll();
        logger.info('All cache cleared');

        return generateResponseData({}, true, STATUS_OK, 'All cache cleared');
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * @namespace FlushCacheService
 * @description Group of services related to flushCache operations.
 */
export const FlushCacheService = {
    deleteFlushCacheService
};
