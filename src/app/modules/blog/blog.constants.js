/**
 * @fileoverview Constants for ID Generation and String Validations.
 *
 * This module defines a set of constants used throughout the application for ID generation,
 * validation, and managing constraints for various string values. The `ID_CONSTANTS` namespace
 * includes constants related to ID generation and validation, such as prefixes for different types
 * of IDs and their length constraints. The `STRING_CONSTANTS` namespace contains constants defining
 * minimum and maximum lengths for various string fields like titles, categories, and descriptions.
 * These constants ensure consistency in data formats and validation logic across the application.
 *
 * @namespace ID_CONSTANTS - Constants for ID generation and validation.
 * @namespace STRING_CONSTANTS - Constants for minimum and maximum lengths of various string fields.
 * @module Constants - Exports constants used for ID and string validations.
 */

/**
 * @constant
 * @namespace ID_CONSTANTS
 * @description Constants related to ID generation and validation.
 * @property {string} ADMIN_PREFIX - Prefix for admin IDs.
 * @property {string} STUDENT_PREFIX - Prefix for blogPost IDs.
 * @property {number} MIN_LENGTH - Minimum allowed length for IDs.
 * @property {number} MAX_LENGTH - Maximum allowed length for IDs.
 */
export const ID_CONSTANTS = {
    HOME_PAGE_POST_PREFIX: "blogPost",
    MIN_LENGTH: 9,
    MAX_LENGTH: 30
};

export const STRING_CONSTANTS = {
    TITLE_MIN_LENGTH: 3,
    CATEGORY_MIN_LENGTH: 3,
    DESCRIPTION_MIN_LENGTH: 3,
    TITLE_MAX_LENGTH: 200,
    CATEGORY_MAX_LENGTH: 100,
    DESCRIPTION_MAX_LENGTH: 5000,
};