/**
 * @fileoverview Constants for Admin Module.
 *
 * This module defines constants used in the admin module, particularly for ID generation and validation,
 * as well as property length constraints. These constants ensure consistent ID formats and validate the length of
 * various fields associated with admins, such as name, category, and designation. The constants are used
 * throughout the admin module to maintain standardization and data integrity.
 *
 * @module ADMIN_CONSTANTS
 */

/**
 * Constants for admin ID prefix and length constraints.
 * - `ADMIN_ID_PREFIX`: The standard prefix used for admin IDs.
 * - `ADMIN_ID_MIN_LENGTH`: The minimum length of admin IDs.
 * - `ADMIN_ID_MAX_LENGTH`: The maximum length of admin IDs.
 */
const ADMIN_ID_PREFIX = 'admin';
const ADMIN_ID_MIN_LENGTH = 12;
const ADMIN_ID_MAX_LENGTH = 12;

/**
 * Constants for property length constraints.
 * These constants define the minimum and maximum lengths for various admin-related properties.
 * - `PROPERTY_USERNAME_MIN_LENGTH`: Minimum length for admin usernames.
 * - `PROPERTY_USERNAME_MAX_LENGTH`: Maximum length for admin usernames.
 * - `PROPERTY_PASSWORD_MIN_LENGTH`: Minimum length for admin passwords.
 * - `PROPERTY_PASSWORD_MAX_LENGTH`: Maximum length for admin passwords.
 * - `PROPERTY_NAME_MIN_LENGTH`: Minimum length for admin names.
 * - `PROPERTY_NAME_MAX_LENGTH`: Maximum length for admin names.
 */
const PROPERTY_USERNAME_MIN_LENGTH = 3;
const PROPERTY_USERNAME_MAX_LENGTH = 10;

const PROPERTY_PASSWORD_MIN_LENGTH = 8;
const PROPERTY_PASSWORD_MAX_LENGTH = 30;

const PROPERTY_NAME_MIN_LENGTH = 3;
const PROPERTY_NAME_MAX_LENGTH = 40;

/**
 * Exported object containing all the constants for the admin module.
 * These constants are used throughout the application for generating and validating admin-related data.
 */
export const ADMIN_CONSTANTS = {
    ADMIN_ID_PREFIX,
    ADMIN_ID_MIN_LENGTH,
    ADMIN_ID_MAX_LENGTH,
    PROPERTY_USERNAME_MIN_LENGTH,
    PROPERTY_USERNAME_MAX_LENGTH,
    PROPERTY_PASSWORD_MIN_LENGTH,
    PROPERTY_PASSWORD_MAX_LENGTH,
    PROPERTY_NAME_MIN_LENGTH,
    PROPERTY_NAME_MAX_LENGTH,
};