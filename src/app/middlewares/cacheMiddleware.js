/**
 * @fileoverview Cache Middleware for Express Application.
 *
 * This module provides middleware functions for caching responses in an Express application.
 * It utilizes NodeCache to store and retrieve cached data, enhancing performance by reducing
 * redundant operations. The middleware includes functions for creating cache entries for
 * GET requests and invalidating cache entries when data is modified via POST, PUT, or DELETE
 * requests. It ensures that responses are consistently updated and provides logging for cache
 * hits, misses, and errors.
 *
 * @requires NodeCache - A simple caching library for Node.js.
 * @requires logger - A shared logger module for logging messages.
 * @requires STANDARD_CACHE_TTL - Constant representing the standard cache duration.
 */

import NodeCache from 'node-cache';
import logger from "../../shared/logger.js";
import { STANDARD_CACHE_TTL, STATUS_INTERNAL_SERVER_ERROR } from "../../constants/constants.js";

const cache = new NodeCache();

/**
 * Middleware to cache responses for GET requests.
 *
 * This middleware checks if a response for the requested URL is already cached.
 * If a cached response is found, it is returned immediately. If not, the response
 * is cached with a standard TTL before being sent to the client. The response is
 * cloned before caching to prevent issues with subsequent modifications.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
const createCacheMiddleware = (req, res, next) => {
    try {
        const key = req?.originalUrl;
        const cachedResponse = cache?.get(key);

        if (cachedResponse) {
            logger?.info(`Cache hit for ${key}`);

            return res?.send(cachedResponse);
        } else {
            res.sendResponse = res?.send;
            res.send = (body) => {
                try {
                    const clonedBody = JSON?.parse(JSON?.stringify(body)); // Cloning the response

                    if (cache?.set(key, clonedBody, STANDARD_CACHE_TTL)) {
                        logger?.info(`Response cached for ${key} with TTL of ${STANDARD_CACHE_TTL} seconds`);
                    } else {
                        logger?.warn(`Failed to cache response for ${key}`);
                    }
                } catch (error) {
                    logger.error(`Error caching response for ${key}: ${error?.message}`);
                }

                res?.sendResponse(body);
            };

            next();
        }
    } catch (error) {
        logger.error(`Cache error: ${error.message}`);

        next();
    }
};

/**
 * Middleware to invalidate cache entries.
 *
 * This middleware clears cache entries for specific routes when data is modified.
 * It is intended to be used in routes that handle POST, PUT, or DELETE operations.
 * The middleware ensures that the cache does not return stale data after such operations.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The next middleware function in the stack.
 */
const deleteCacheMiddleware = (req, res, next) => {
    try {
        // Regular expression to match the ID pattern at the end of the route
        const idPattern = /\/[a-zA-Z]+-[0-9a-f]{6}$/;
        // Regular expression to match file extensions
        const fileExtensionPattern = /\/[^\/]+\.\w+$/;

        let routeToDeleteCache;

        // Special cases handling
        const specialCases = {
            "/api/v1/category": "/api/v1/administration",
            "/api/v1/level": "/api/v1/student"
            // Add more special cases if needed
        };

        if (fileExtensionPattern?.test(req?.originalUrl)) {
            // Clear cache for the parent route if a filename is detected
            routeToDeleteCache = req?.originalUrl?.replace(/\/[^\/]+$/, '');
        } else if (idPattern.test(req?.originalUrl)) {
            // Extract the immediate parent route for ID-based URLs
            routeToDeleteCache = req?.originalUrl?.replace(idPattern, '');
        } else if (specialCases[req?.originalUrl]) {
            // Use special case route if it exists
            routeToDeleteCache = specialCases[req?.originalUrl];
        } else {
            // Use the original URL if no file extension, ID pattern, or special case is detected
            routeToDeleteCache = req?.originalUrl;
        }

        // Delete the cache for the determined route
        if (cache?.del(routeToDeleteCache)) {
            logger?.info(`Cache cleared for ${routeToDeleteCache}`);
        } else {
            logger?.warn(`No cache found for ${routeToDeleteCache} to clear`);
        }

        next();
    } catch (error) {
        logger?.error(`Cache clearing failed: ${error?.message}`);
        res?.status(STATUS_INTERNAL_SERVER_ERROR)?.json({}, true, STATUS_INTERNAL_SERVER_ERROR, "Cache clearing failed");
    }
};

export const CacheMiddleware = {
    createCacheMiddleware,
    deleteCacheMiddleware
};