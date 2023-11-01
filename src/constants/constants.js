/**
 * @file
 * This file defines various constants related to CORS settings, logging levels, logging colors, server messages, and upload directories.
 *
 * @description
 * - `ALLOWED_ORIGIN`: Specifies the allowed origins for CORS.
 * - `ALLOWED_METHODS`: Specifies the allowed HTTP methods for CORS.
 * - `LOG_LEVELS`: Defines the logging levels used in the application.
 * - `LOG_COLORS`: Specifies the colors corresponding to each log level.
 * - `SERVER_LOG_MESSAGE`: A message indicating that the server is running.
 * - `FORBIDDEN_MESSAGE`: A message indicating that the user does not have the necessary permissions.
 * - `UPLOAD_DIRECTORY_MAP`: Maps upload categories to their respective directories.
 */

// CORS related
const ALLOWED_ORIGIN = [
    "https://school-abid.vercel.app",
    "http://localhost:3000",
];
const ALLOWED_METHODS = "GET,PUT,POST,DELETE";

// Log related
const LOG_LEVELS = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
};
const LOG_COLORS = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'cyan',
    verbose: 'magenta',
    debug: 'blue',
};

// Message related
const SERVER_LOG_MESSAGE = "Server running on port";
const FORBIDDEN_MESSAGE = "You do not have necessary permission";

const UPLOAD_DIRECTORY_MAP = {
    'download': 'download',
    'notice': 'notice',
    'result': 'result',
    'routine': 'routine'
};

export {
    ALLOWED_ORIGIN,
    ALLOWED_METHODS,
    LOG_LEVELS,
    LOG_COLORS,
    SERVER_LOG_MESSAGE,
    FORBIDDEN_MESSAGE,
    UPLOAD_DIRECTORY_MAP,
};