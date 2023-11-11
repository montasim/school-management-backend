/**
 * @fileoverview Constants for ID generation and image filename validation.
 *
 * This module defines constants and patterns used across the application for generating
 * and validating identifiers, as well as for validating image file names. These constants
 * ensure consistent ID structure and adherence to expected file naming conventions.
 *
 * @module constants - Exports constants for ID generation and image filename validation.
 */

/**
 * @constant
 * @namespace ID_CONSTANTS
 * @description Constants related to ID generation and validation.
 * @property {string} DOWNLOAD_PREFIX - Prefix for download IDs.
 * @property {number} MIN_LENGTH - Minimum allowed length for IDs.
 * @property {number} MAX_LENGTH - Maximum allowed length for IDs.
 */
export const ID_CONSTANTS = {
    DOWNLOAD_PREFIX: "download",
    MIN_LENGTH: 9,
    MAX_LENGTH: 30
};

/**
 * @constant
 * @type {RegExp}
 * @description Regular expression pattern for validating image filenames.
 * Expected to match filenames with alphanumeric characters and ending with jpg, png, jpeg, or gif extensions.
 */
export const IMAGE_PATTERN = /[a-zA-Z0-9]+\.(jpg|png|jpeg|gif)$/;
