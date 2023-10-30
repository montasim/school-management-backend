import dotenv from "dotenv";

// Initialize dotenv configuration
dotenv.config();

/**
 * Depending on the NODE_ENV, load the appropriate environment variables.
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
 * @typedef {Object} Config
 * @property {string} PORT - The port number for the application server.
 * @property {string} MONGODB_URI - The connection URI for the MongoDB database.
 * @property {string} DATABASE_NAME - The name of the MongoDB database.
 * @property {string} API_VERSION - The version of the API.
 * @property {string} SECRET_TOKEN - The secret token for authentication.
 * @property {string} CATEGORY_COLLECTION_NAME - The name of the category collection in MongoDB.
 */

/**
 * @type {Config}
 */
export const {
    PORT,
    MONGODB_URI,
    DATABASE_NAME,
    API_VERSION,
    SECRET_TOKEN,
    ADMIN_COLLECTION_NAME,
    ADMINISTRATION_COLLECTION_NAME,
    CATEGORY_COLLECTION_NAME,
    CLASS_COLLECTION_NAME,
    DOWNLOAD_COLLECTION_NAME,
    NOTICE_COLLECTION_NAME,
    RESULT_COLLECTION_NAME,
    ROUTINE_COLLECTION_NAME,
    STUDENT_COLLECTION_NAME,
} = process.env;
