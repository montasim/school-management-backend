/**
 * @fileoverview Constants for Administration Module.
 *
 * This module defines constants used in the administration module, particularly for ID generation and validation,
 * as well as property length constraints. These constants ensure consistent ID formats and validate the length of
 * various fields associated with administrations, such as name, category, and designation. The constants are used
 * throughout the administration module to maintain standardization and data integrity.
 *
 * @module ADMINISTRATION_CONSTANTS
 */

/**
 * Constants for administration ID prefix and length constraints.
 * - `ADMINISTRATION_ID_PREFIX`: The standard prefix used for administration IDs.
 * - `ADMINISTRATION_ID_MIN_LENGTH`: The minimum length of administration IDs.
 * - `ADMINISTRATION_ID_MAX_LENGTH`: The maximum length of administration IDs.
 */
const ADMINISTRATION_ID_PREFIX = 'administration';
const ADMINISTRATION_ID_MIN_LENGTH = 21;
const ADMINISTRATION_ID_MAX_LENGTH = 21;

/**
 * Constants for defining minimum and maximum length of various administration properties.
 * - `PROPERTY_NAME_MIN_LENGTH`: Minimum length of the administration's name.
 * - `PROPERTY_NAME_MAX_LENGTH`: Maximum length of the administration's name.
 * - `PROPERTY_CATEGORY_MIN_LENGTH`: Minimum length of the administration's category.
 * - `PROPERTY_CATEGORY_MAX_LENGTH`: Maximum length of the administration's category.
 * - `PROPERTY_DESIGNATION_MIN_LENGTH`: Minimum length of the administration's designation.
 * - `PROPERTY_DESIGNATION_MAX_LENGTH`: Maximum length of the administration's designation.
 */
const PROPERTY_NAME_MIN_LENGTH = 3;
const PROPERTY_NAME_MAX_LENGTH = 50;
const PROPERTY_CATEGORY_MIN_LENGTH = 3;
const PROPERTY_CATEGORY_MAX_LENGTH = 90;
const PROPERTY_DESIGNATION_MIN_LENGTH = 3;
const PROPERTY_DESIGNATION_MAX_LENGTH = 50;

/**
 * Exported object containing all the constants for the administration module.
 * These constants are used throughout the application for generating and validating administration-related data.
 */
export const ADMINISTRATION_CONSTANTS = {
    ADMINISTRATION_ID_PREFIX,
    ADMINISTRATION_ID_MIN_LENGTH,
    ADMINISTRATION_ID_MAX_LENGTH,
    PROPERTY_NAME_MIN_LENGTH,
    PROPERTY_NAME_MAX_LENGTH,
    PROPERTY_CATEGORY_MIN_LENGTH,
    PROPERTY_CATEGORY_MAX_LENGTH,
    PROPERTY_DESIGNATION_MIN_LENGTH,
    PROPERTY_DESIGNATION_MAX_LENGTH
};