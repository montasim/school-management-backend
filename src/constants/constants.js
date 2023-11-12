/**
 * @fileoverview Application-wide Constants.
 *
 * This module defines a variety of constants used throughout the application.
 * These constants include configurations for CORS (Cross-Origin Resource Sharing),
 * file extension types, maximum file sizes, MIME types, logging levels and colors,
 * standard HTTP status codes, and common server messages.
 *
 * By centralizing these constants, the application ensures consistent usage and
 * easy maintenance of these key values, which are integral to various functionalities
 * such as file handling, logging, response formatting, and security checks.
 *
 * @module constants - Exports constants for CORS, file types, logging, MIME types, and standard messages.
 */

// CORS related
const ALLOWED_ORIGIN = [
    "https://school-abid.vercel.app",
    "http://localhost:3000",
];
const ALLOWED_METHODS = "GET,PUT,POST,DELETE";

// File extension related
const FILE_EXTENSION_TYPE_PDF = "pdf";
const FILE_EXTENSION_TYPE_JPG = "jpg";
const FILE_EXTENSION_TYPE_PNG = "png";
const FILE_EXTENSION_TYPE_ICO = "ico";

// File size
const MAX_PDF_FILE_SIZE = 25 * 1024 * 1024;
const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024;

// MIME types
const MIME_TYPE_PDF = "application/pdf";
const MIME_TYPE_JPG = "image/jpeg";
const MIME_TYPE_PNG = "image/png";
const MIME_TYPE_ICO = "image/x-icon";

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

// Status code
const STATUS_OK = 200;
const STATUS_BAD_REQUEST = 400;
const STATUS_UNAUTHORIZED = 401;
const STATUS_FORBIDDEN = 403;
const STATUS_NOT_FOUND = 404;
const STATUS_UNPROCESSABLE_ENTITY = 422;
const STATUS_INTERNAL_SERVER_ERROR = 500;

// Message related
const SERVER_LOG_MESSAGE = "Server running on port";
const SERVER_DOWN_MESSAGE = "Your request can not be processed at this moment. Please try again later 🥲🥲🥲";
const FORBIDDEN_MESSAGE = "You do not have necessary permission";

export {
    ALLOWED_ORIGIN,
    ALLOWED_METHODS,
    FILE_EXTENSION_TYPE_PDF,
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    FILE_EXTENSION_TYPE_ICO,
    MAX_PDF_FILE_SIZE,
    MAX_IMAGE_FILE_SIZE,
    LOG_LEVELS,
    LOG_COLORS,
    MIME_TYPE_PDF,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG,
    MIME_TYPE_ICO,
    STATUS_OK,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORIZED,
    STATUS_FORBIDDEN,
    STATUS_NOT_FOUND,
    STATUS_UNPROCESSABLE_ENTITY,
    STATUS_INTERNAL_SERVER_ERROR,
    SERVER_LOG_MESSAGE,
    SERVER_DOWN_MESSAGE,
    FORBIDDEN_MESSAGE,
};