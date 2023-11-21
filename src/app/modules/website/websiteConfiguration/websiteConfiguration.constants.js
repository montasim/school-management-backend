/**
 * @fileoverview Constants for WebsiteConfiguration Module.
 *
 * This module defines constants used in the websiteConfiguration module, particularly for ID generation and validation,
 * as well as property length constraints. These constants ensure consistent ID formats and validate the length of
 * various fields associated with websiteConfigurations, such as name, category, and designation. The constants are used
 * throughout the websiteConfiguration module to maintain standardization and data integrity.
 *
 * @module WEBSITE_CONFIGURATION_CONSTANTS
 */

/**
 * Constants for websiteConfiguration ID prefix and length constraints.
 * - `WEBSITE_CONFIGURATION_ID_PREFIX`: The standard prefix used for websiteConfiguration IDs.
 * - `WEBSITE_CONFIGURATION_ID_MIN_LENGTH`: The minimum length of websiteConfiguration IDs.
 * - `WEBSITE_CONFIGURATION_ID_MAX_LENGTH`: The maximum length of websiteConfiguration IDs.
 */
const WEBSITE_CONFIGURATION_ID_PREFIX = 'websiteConfiguration';
const WEBSITE_CONFIGURATION_ID_MIN_LENGTH = 27;
const WEBSITE_CONFIGURATION_ID_MAX_LENGTH = 27;

/**
 * Constants for defining minimum and maximum length of various websiteConfiguration properties.
 * - `PROPERTY_NAME_MIN_LENGTH`: Minimum length of the websiteConfiguration's name.
 * - `PROPERTY_NAME_MAX_LENGTH`: Maximum length of the websiteConfiguration's name.
 * - `PROPERTY_SLOGAN_MIN_LENGTH`: Minimum length of the websiteConfiguration's category.
 * - `PROPERTY_SLOGAN_MAX_LENGTH`: Maximum length of the websiteConfiguration's category.
 * - `PROPERTY_DESIGNATION_MIN_LENGTH`: Minimum length of the websiteConfiguration's designation.
 * - `PROPERTY_DESIGNATION_MAX_LENGTH`: Maximum length of the websiteConfiguration's designation.
 */
const PROPERTY_NAME_MIN_LENGTH = 3;
const PROPERTY_NAME_MAX_LENGTH = 50;
const PROPERTY_SLOGAN_MIN_LENGTH = 3;
const PROPERTY_SLOGAN_MAX_LENGTH = 90;

/**
 * Exported object containing all the constants for the websiteConfiguration module.
 * These constants are used throughout the application for generating and validating websiteConfiguration-related data.
 */
export const WEBSITE_CONFIGURATION_CONSTANTS = {
    WEBSITE_CONFIGURATION_ID_PREFIX,
    WEBSITE_CONFIGURATION_ID_MIN_LENGTH,
    WEBSITE_CONFIGURATION_ID_MAX_LENGTH,
    PROPERTY_NAME_MIN_LENGTH,
    PROPERTY_NAME_MAX_LENGTH,
    PROPERTY_SLOGAN_MIN_LENGTH,
    PROPERTY_SLOGAN_MAX_LENGTH,
};