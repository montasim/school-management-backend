/**
 * @fileoverview Constants for Admission Form Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating admission form data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the admission form ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */


const ADMISSION_FORM_ID_PREFIX = 'admissionForm';
const ADMISSION_FORM_ID_MIN_LENGTH = 20;
const ADMISSION_FORM_ID_MAX_LENGTH = 20;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const ADMISSION_FORM_CONSTANTS = {
    ADMISSION_FORM_ID_PREFIX,
    ADMISSION_FORM_ID_MIN_LENGTH,
    ADMISSION_FORM_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};