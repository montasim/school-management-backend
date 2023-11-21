/**
 * @fileoverview Constants for Notice Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating notice data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the notice ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */


const NOTICE_ID_PREFIX = 'notice';
const NOTICE_ID_MIN_LENGTH = 15;
const NOTICE_ID_MAX_LENGTH = 15;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const NOTICE_CONSTANTS = {
    NOTICE_ID_PREFIX,
    NOTICE_ID_MIN_LENGTH,
    NOTICE_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};