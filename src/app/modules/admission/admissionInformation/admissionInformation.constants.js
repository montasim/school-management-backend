/**
 * @fileoverview Constants for Admission Information Validation.
 *
 * This module exports constants used for validating admission information entities in the application.
 * It includes minimum and maximum lengths for various properties like title, description, form fee,
 * admission fee, last form submission date, and contact information. These constants ensure that the
 * admission information data adheres to specified size constraints, maintaining consistency and reliability
 * in the data validation process.
 *
 * @module ADMISSION_INFORMATION_CONSTANTS - Exported constants for admission information validation.
 */

/**
 * Constants defining length constraints for properties of admission information.
 */
const ADMISSION_INFORMATION_ID_PREFIX = 'admissionInformation';
const ADMISSION_INFORMATION_ID_MIN_LENGTH = 27;
const ADMISSION_INFORMATION_ID_MAX_LENGTH = 27;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

const PROPERTY_DESCRIPTION_MIN_LENGTH = 3;
const PROPERTY_DESCRIPTION_MAX_LENGTH = 3000;

const PROPERTY_FORM_PRICE_MIN_LENGTH = 3;
const PROPERTY_FORM_PRICE_MAX_LENGTH = 10;

const PROPERTY_ADMISSION_FEE_MIN_LENGTH = 3;
const PROPERTY_ADMISSION_FEE_MAX_LENGTH = 10;

const PROPERTY_LAST_FORM_SUBMISSION_DATE_MIN_LENGTH = 3;
const PROPERTY_LAST_FORM_SUBMISSION_DATE_MAX_LENGTH = 12;

const PROPERTY_CONTACT_MIN_LENGTH = 3;
const PROPERTY_CONTACT_MAX_LENGTH = 1000;

/**
 * Exported constants for use in admission information validation.
 */
export const ADMISSION_INFORMATION_CONSTANTS = {
    ADMISSION_INFORMATION_ID_PREFIX,
    ADMISSION_INFORMATION_ID_MIN_LENGTH,
    ADMISSION_INFORMATION_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
    PROPERTY_DESCRIPTION_MIN_LENGTH,
    PROPERTY_DESCRIPTION_MAX_LENGTH,
    PROPERTY_FORM_PRICE_MIN_LENGTH,
    PROPERTY_FORM_PRICE_MAX_LENGTH,
    PROPERTY_ADMISSION_FEE_MIN_LENGTH,
    PROPERTY_ADMISSION_FEE_MAX_LENGTH,
    PROPERTY_LAST_FORM_SUBMISSION_DATE_MIN_LENGTH,
    PROPERTY_LAST_FORM_SUBMISSION_DATE_MAX_LENGTH,
    PROPERTY_CONTACT_MIN_LENGTH,
    PROPERTY_CONTACT_MAX_LENGTH,
};