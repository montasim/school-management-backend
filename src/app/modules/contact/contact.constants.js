/**
 * @fileoverview Constants for Contact Data Validation.
 *
 * This module defines a series of constants used to set minimum and maximum length
 * constraints for various fields in contact forms or related data structures. These constants
 * are used throughout the application, particularly in validation schemas, to ensure
 * consistency in the validation of contact-related data. This includes fields like the
 * first name, last name, phone number, email address, subject, and message content.
 * These constants are crucial for maintaining data integrity and providing clear
 * guidelines for data entry requirements in contact forms.
 *
 * @module CONTACT_CONSTANTS - Exported constants for contact data validation.
 */

// Constants defining minimum and maximum lengths for first and last names.
const PROPERTY_FIRST_NAME_MIN_LENGTH = 3;
const PROPERTY_FIRST_NAME_MAX_LENGTH = 20;
const PROPERTY_LAST_NAME_MIN_LENGTH = 3;
const PROPERTY_LAST_NAME_MAX_LENGTH = 20;

// Constants for phone number lengths, accounting for possible inclusion of country code.
const PROPERTY_PHONE_MIN_LENGTH = 10; // Minimum length without country code
const PROPERTY_PHONE_MAX_LENGTH = 14; // Maximum length with country code '+880'

// Constants for email lengths.
const PROPERTY_EMAIL_MIN_LENGTH = 4;
const PROPERTY_EMAIL_MAX_LENGTH = 30;

// Constants for subject and message lengths in contact forms.
const PROPERTY_SUBJECT_MIN_LENGTH = 3;
const PROPERTY_SUBJECT_MAX_LENGTH = 500;
const PROPERTY_MESSAGE_MIN_LENGTH = 3;
const PROPERTY_MESSAGE_MAX_LENGTH = 3000;

/**
 * Exported object containing all the defined constants for contact data validation.
 * These constants are used in various parts of the application, particularly in
 * validation logic to ensure that user inputs meet the defined constraints for length
 * and format.
 * @namespace CONTACT_CONSTANTS
 */
export const CONTACT_CONSTANTS = {
    PROPERTY_FIRST_NAME_MIN_LENGTH,
    PROPERTY_FIRST_NAME_MAX_LENGTH,
    PROPERTY_LAST_NAME_MIN_LENGTH,
    PROPERTY_LAST_NAME_MAX_LENGTH,
    PROPERTY_PHONE_MIN_LENGTH,
    PROPERTY_PHONE_MAX_LENGTH,
    PROPERTY_EMAIL_MIN_LENGTH,
    PROPERTY_EMAIL_MAX_LENGTH,
    PROPERTY_SUBJECT_MIN_LENGTH,
    PROPERTY_SUBJECT_MAX_LENGTH,
    PROPERTY_MESSAGE_MIN_LENGTH,
    PROPERTY_MESSAGE_MAX_LENGTH,
};