/**
 * @fileoverview Constants for Others Information Validation.
 *
 * This module exports constants used for validating others information entities in the application.
 * It includes minimum and maximum lengths for various properties like title, description, form fee,
 * others fee, last form submission date, and contact information. These constants ensure that the
 * others information data adheres to specified size constraints, maintaining consistency and reliability
 * in the data validation process.
 *
 * @module OTHERS_INFORMATION_CONSTANTS - Exported constants for others information validation.
 */

/**
 * Constants defining length constraints for properties of others information.
 */
const OTHERS_INFORMATION_ID_PREFIX = 'othersInformation';
const OTHERS_INFORMATION_ID_MIN_LENGTH = 24;
const OTHERS_INFORMATION_ID_MAX_LENGTH = 24;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

const PROPERTY_CATEGORY_MIN_LENGTH = 3;
const PROPERTY_CATEGORY_MAX_LENGTH = 50;

const PROPERTY_DESCRIPTION_MIN_LENGTH = 3;
const PROPERTY_DESCRIPTION_MAX_LENGTH = 3000;

/**
 * Exported constants for use in others information validation.
 */
export const OTHERS_INFORMATION_CONSTANTS = {
    OTHERS_INFORMATION_ID_PREFIX,
    OTHERS_INFORMATION_ID_MIN_LENGTH,
    OTHERS_INFORMATION_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
    PROPERTY_CATEGORY_MIN_LENGTH,
    PROPERTY_CATEGORY_MAX_LENGTH,
    PROPERTY_DESCRIPTION_MIN_LENGTH,
    PROPERTY_DESCRIPTION_MAX_LENGTH,
};