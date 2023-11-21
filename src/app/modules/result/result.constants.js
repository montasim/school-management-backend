/**
 * @fileoverview Constants for Result Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating result data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the result ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */


const RESULT_ID_PREFIX = 'result';
const RESULT_ID_MIN_LENGTH = 15;
const RESULT_ID_MAX_LENGTH = 15;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const RESULT_CONSTANTS = {
    RESULT_ID_PREFIX,
    RESULT_ID_MIN_LENGTH,
    RESULT_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};