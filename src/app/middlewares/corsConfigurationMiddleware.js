/**
 * @fileoverview CORS Configuration Middleware Module.
 *
 * This module exports a configuration object for setting up CORS (Cross-Origin Resource Sharing) middleware in a Node.js application.
 * It utilizes constants defined in "../../constants/constants.js" to specify allowed origins and HTTP methods.
 * The configuration object includes properties for defining acceptable origins, HTTP methods, and whether to support user credentials
 * (such as cookies and HTTP authentication).
 *
 * @module corsConfigurationMiddleware
 */

import { ALLOWED_ORIGIN, ALLOWED_METHODS } from "../../constants/constants.js";

/**
 * Configuration object for CORS middleware.
 * @type {object}
 * @property {string[]} origin - An array of allowed origins.
 * @property {string} methods - Allowed HTTP methods.
 * @property {boolean} credentials - Indicates whether user credentials are supported.
 */
const corsConfigurationMiddleware = {
    origin: ALLOWED_ORIGIN,
    methods: ALLOWED_METHODS,
    credentials: true, // If you need to support cookies or authentication
};

export default corsConfigurationMiddleware;