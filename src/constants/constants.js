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
    "https://ullasacademy.com",
    "http://localhost:3000",
    "http://localhost:5000",
];
const ALLOWED_METHODS = ["OPTIONS", "POST", "GET", "PUT", "DELETE"];

// Rate limit settings
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // Defines the time window to be 15 minutes
const RATE_LIMIT_MAX = 500; // Limits each user to 500 requests per windowMs
const RATE_LIMIT_MESSAGE = "You have exceeded the 100 requests in 15 minutes limit! Please try again later.";
const RATE_LIMIT_HEADERS = true; // Adds rate limit headers to responses

// Timeout related methods
const TIMEOUT_IN_SECONDS = '60s';

// Payload related methods
const JSON_PAYLOAD_LIMIT = '10kb';

// Cache related methods
const STANDARD_CACHE_TTL = 24 * 60 * 60; // 86,400 seconds
const STANDARD_CACHE_TTL_IN_MILLISECOND = 24 * 60 * 60 * 1000;

// File extension related
const FILE_EXTENSION_TYPE_PDF = "pdf";
const FILE_EXTENSION_TYPE_JPG = "jpg";
const FILE_EXTENSION_TYPE_PNG = "png";
const FILE_EXTENSION_TYPE_ICO = "ico";
const FILE_EXTENSION_TYPE_MP4 = "mp4";

// File size
const MAX_PDF_FILE_SIZE = 25 * 1024 * 1024;
const MAX_IMAGE_FILE_SIZE = 2 * 1024 * 1024;

// MIME types
const MIME_TYPE_PDF = "application/pdf";
const MIME_TYPE_JPG = "image/jpeg";
const MIME_TYPE_PNG = "image/png";
const MIME_TYPE_ICO = "image/x-icon";
const MIME_TYPE_MP4 = "video/mp4";

// File size
const MAXIMUM_FILE_SIZE = 1024 * 1024 * 1.1 // 1.1MB

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
const STATUS_LOCKED = 423;
const STATUS_INTERNAL_SERVER_ERROR = 500;

// Message related
const SERVER_LOG_MESSAGE = "Server running on port";
const SERVER_DOWN_MESSAGE = "Your request can not be processed at this moment. Please try again later 🥲🥲🥲";
const FORBIDDEN_MESSAGE = "You do not have necessary permission";

// Different body properties related
const BLOG_PROPERTY_TITLE_MIN_LENGTH = 3;
const BLOG_PROPERTY_TITLE_MAX_LENGTH = 200;
const BLOG_PROPERTY_CATEGORY_MIN_LENGTH = 3;
const BLOG_PROPERTY_CATEGORY_MAX_LENGTH = 100;
const BLOG_PROPERTY_DESCRIPTION_MIN_LENGTH = 3;
const BLOG_PROPERTY_DESCRIPTION_MAX_LENGTH = 5000;

// Error handling related
const EMAIL_RECIPIENTS = ['montasimmamun@gmail.com', 'meghpiash@gmail.com'];

export {
    ALLOWED_ORIGIN,
    ALLOWED_METHODS,
    RATE_LIMIT_WINDOW_MS,
    RATE_LIMIT_MAX,
    RATE_LIMIT_MESSAGE,
    RATE_LIMIT_HEADERS,
    TIMEOUT_IN_SECONDS,
    JSON_PAYLOAD_LIMIT,
    STANDARD_CACHE_TTL,
    STANDARD_CACHE_TTL_IN_MILLISECOND,
    FILE_EXTENSION_TYPE_PDF,
    FILE_EXTENSION_TYPE_JPG,
    FILE_EXTENSION_TYPE_PNG,
    FILE_EXTENSION_TYPE_ICO,
    FILE_EXTENSION_TYPE_MP4,
    MAX_PDF_FILE_SIZE,
    MAX_IMAGE_FILE_SIZE,
    MAXIMUM_FILE_SIZE,
    LOG_LEVELS,
    LOG_COLORS,
    MIME_TYPE_PDF,
    MIME_TYPE_JPG,
    MIME_TYPE_PNG,
    MIME_TYPE_ICO,
    MIME_TYPE_MP4,
    STATUS_OK,
    STATUS_BAD_REQUEST,
    STATUS_UNAUTHORIZED,
    STATUS_FORBIDDEN,
    STATUS_NOT_FOUND,
    STATUS_UNPROCESSABLE_ENTITY,
    STATUS_LOCKED,
    STATUS_INTERNAL_SERVER_ERROR,
    SERVER_LOG_MESSAGE,
    SERVER_DOWN_MESSAGE,
    FORBIDDEN_MESSAGE,
    BLOG_PROPERTY_TITLE_MIN_LENGTH,
    BLOG_PROPERTY_TITLE_MAX_LENGTH,
    BLOG_PROPERTY_CATEGORY_MIN_LENGTH,
    BLOG_PROPERTY_CATEGORY_MAX_LENGTH,
    BLOG_PROPERTY_DESCRIPTION_MIN_LENGTH,
    BLOG_PROPERTY_DESCRIPTION_MAX_LENGTH,
    EMAIL_RECIPIENTS,
};