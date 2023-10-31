/**
 * @constant
 * @namespace ID_CONSTANTS
 * @description Constants related to ID generation and validation.
 * @property {string} ADMIN_PREFIX - Prefix for admin IDs.
 * @property {string} STUDENT_PREFIX - Prefix for category IDs.
 * @property {number} MIN_LENGTH - Minimum allowed length for IDs.
 * @property {number} MAX_LENGTH - Maximum allowed length for IDs.
 */
export const ID_CONSTANTS = {
    ANNOUNCEMENT_PREFIX: "announcement",
    MIN_LENGTH: 3,
    MAX_LENGTH: 300
};

/**
 * @constant
 * @type {RegExp}
 * @description Regular expression pattern for validating image filenames.
 * Expected to match filenames with alphanumeric characters and ending with jpg, png, jpeg, or gif extensions.
 */
export const IMAGE_PATTERN = /[a-zA-Z0-9]+\.(jpg|png|jpeg|gif)$/;
