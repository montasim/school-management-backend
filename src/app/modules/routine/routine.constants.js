/**
 * @fileoverview Constants for Routine Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating routine data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the routine ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */


const ROUTINE_ID_PREFIX = 'routine';
const ROUTINE_ID_MIN_LENGTH = 15;
const ROUTINE_ID_MAX_LENGTH = 15;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const ROUTINE_CONSTANTS = {
    ROUTINE_ID_PREFIX,
    ROUTINE_ID_MIN_LENGTH,
    ROUTINE_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};