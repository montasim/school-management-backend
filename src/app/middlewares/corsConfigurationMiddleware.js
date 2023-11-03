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
