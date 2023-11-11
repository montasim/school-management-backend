/**
 * @fileoverview Constants for ID Generation and Image Filename Validation.
 *
 * This file defines key constants used throughout the application for tasks like ID generation and validation,
 * as well as for ensuring proper formatting of image filenames. It includes the definition of ID_CONSTANTS,
 * which provides guidelines for creating and validating IDs with specific prefixes and length constraints.
 * Additionally, it declares a regular expression pattern (IMAGE_PATTERN) used to validate filenames of images,
 * ensuring they match a set structure and file extension types.
 *
 * @requires RegExp - Regular Expression object for pattern matching.
 * @module Constants - Exported constants for ID generation/validation and image filename validation.
 */

/**
 * Constants for ID Generation and Validation.
 *
 * Defines constants to standardize ID generation and validation processes across different entities in the system.
 * These constants include prefixes for different types of IDs, such as admin and website important information link IDs,
 * along with minimum and maximum length constraints for these IDs. These standards are crucial for maintaining consistency
 * and uniqueness of identifiers throughout the application.
 */
export const ID_CONSTANTS = {
    WEBSITE_PREFIX: "websiteOfficialLink",
    MIN_LENGTH: 9,
    MAX_LENGTH: 40
};

/**
 * Regular Expression Pattern for Image Filename Validation.
 *
 * Provides a regular expression pattern used to validate the filenames of image files. This pattern ensures that filenames
 * consist of alphanumeric characters and are followed by specific image file extensions (jpg, png, jpeg, gif).
 * It is a crucial part of validating and processing image files, ensuring they adhere to expected naming conventions and formats.
 */
export const IMAGE_PATTERN = /[a-zA-Z0-9]+\.(jpg|png|jpeg|gif)$/;