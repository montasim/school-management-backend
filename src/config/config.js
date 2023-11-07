import dotenv from "dotenv";

// Initialize dotenv configuration
dotenv.config();

/**
 * Load environment-specific variables based on NODE_ENV.
 * - If NODE_ENV is 'production', load variables from '.env.production'.
 * - If NODE_ENV is 'staging', load variables from '.env.staging'.
 * - Otherwise, load variables from '.env.development'.
 */
if (process.env.NODE_ENV === "production") {
    dotenv.config({ path: ".env.production" });
} else if (process.env.NODE_ENV === "staging") {
    dotenv.config({ path: ".env.staging" });
} else {
    dotenv.config({ path: ".env.development" });
}

/**
 * @typedef {Object} ServerConfig
 * @property {string} API_VERSION - The version of the API.
 * @property {string} PORT - The port number for the application server.
 */
/**
 * @type {ServerConfig}
 */
// Server and API configurations
export const {
    API_VERSION,
    PORT,
} = process.env;

/**
 * @typedef {Object} SecurityConfig
 * @property {string} SECRET_TOKEN - The secret token for authentication.
 */
/**
 * @type {SecurityConfig}
 */
// Security configurations
export const {
    SECRET_TOKEN,
} = process.env;

/**
 * @typedef {Object} MongoDBConfig
 * @property {string} ADMIN_COLLECTION_NAME - The name of the admin collection in MongoDB.
 * @property {string} ANNOUNCEMENT_COLLECTION_NAME - The name of the announcement collection in MongoDB.
 * @property {string} CATEGORY_COLLECTION_NAME - The name of the category collection in MongoDB.
 * ...other collection names...
 */
/**
 * @type {MongoDBConfig}
 */
// MongoDB related configurations
export const {
    ADMIN_COLLECTION_NAME,
    ADMINISTRATION_COLLECTION_NAME,
    ANNOUNCEMENT_COLLECTION_NAME,
    BLOG_COLLECTION_NAME,
    CATEGORY_COLLECTION_NAME,
    DATABASE_NAME,
    DESIGNATION_COLLECTION_NAME,
    DOWNLOAD_COLLECTION_NAME,
    HOME_PAGE_CAROUSEL_COLLECTION_NAME,
    HOME_PAGE_POST_COLLECTION_NAME,
    LEVEL_COLLECTION_NAME,
    MONGODB_URI,
    NOTICE_COLLECTION_NAME,
    OTHERS_INFORMATION_CATEGORY_COLLECTION_NAME,
    OTHERS_INFORMATION_COLLECTION_NAME,
    RESULT_COLLECTION_NAME,
    ROUTINE_COLLECTION_NAME,
    STUDENT_COLLECTION_NAME,
    WEBSITE_COLLECTION_NAME,
} = process.env;

/**
 * @typedef {Object} EmailConfig
 * @property {string} EMAIL_SERVICE - The email service to use for sending emails.
 * @property {string} EMAIL_SERVICE_DESTINATION_EMAIL - The destination email address for sending emails.
 * @property {string} EMAIL_SERVICE_PASSWORD - The password for the email service.
 * @property {string} EMAIL_SERVICE_PORT - The port to use for the email service.
 * @property {string} EMAIL_SERVICE_USER - The username for the email service.
 */
/**
 * @type {EmailConfig}
 */
// Email service configurations
export const {
    EMAIL_SERVICE,
    EMAIL_SERVICE_DESTINATION_OWNER_NAME,
    EMAIL_SERVICE_DESTINATION_EMAIL,
    EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_USER,
} = process.env;

/**
 * @typedef {Object} GoogleDriveConfig
 * @property {string} GOOGLE_DRIVE_CLIENT_EMAIL - The client email for Google Drive API.
 * @property {string} GOOGLE_DRIVE_PARENTS - The parent folder IDs for Google Drive uploads.
 * @property {string} GOOGLE_DRIVE_PRIVATE_KEY - The private key for Google Drive API.
 * @property {string} GOOGLE_DRIVE_SCOPE - The scope of access for Google Drive API.
 */
/**
 * @type {GoogleDriveConfig}
 */
// Google Drive configurations
export const {
    GOOGLE_DRIVE_CLIENT_EMAIL,
    GOOGLE_DRIVE_FOLDER_KEY,
    GOOGLE_DRIVE_PRIVATE_KEY,
    GOOGLE_DRIVE_SCOPE,
} = process.env;