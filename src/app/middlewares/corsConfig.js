/**
 * List of allowed origins for CORS configuration.
 * @type {string[]}
 */
const ALLOWED_ORIGIN = [
    "https://school-abid.vercel.app",
    "http://localhost:3000", // Allow requests from localhost
];

/**
 * Allowed HTTP methods for CORS configuration.
 * @type {string}
 */
const ALLOWED_METHODS = "GET,PUT,POST,DELETE";

/**
 * Configuration object for CORS middleware.
 * @type {object}
 * @property {string[]} origin - An array of allowed origins.
 * @property {string} methods - Allowed HTTP methods.
 * @property {boolean} credentials - Indicates whether user credentials are supported.
 */
const corsOptions = {
    origin: ALLOWED_ORIGIN,
    methods: ALLOWED_METHODS,
    credentials: true, // If you need to support cookies or authentication
};

export default corsOptions;
