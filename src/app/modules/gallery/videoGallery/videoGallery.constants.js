/**
 * @fileoverview Constants for VideoGallery Module.
 *
 * This module defines constants used in the videoGallery module, particularly for ID generation and validation,
 * as well as property length constraints. These constants ensure consistent ID formats and validate the length of
 * various fields associated with videoGallery, such as name, category, and designation. The constants are used
 * throughout the videoGallery module to maintain standardization and data integrity.
 *
 * @module VIDEO_GALLERY_CONSTANTS
 */

/**
 * Constants for videoGallery ID prefix and length constraints.
 * - `VIDEO_GALLERY_ID_PREFIX`: The standard prefix used for videoGallery IDs.
 * - `VIDEO_GALLERY_ID_MIN_LENGTH`: The minimum length of videoGallery IDs.
 * - `VIDEO_GALLERY_ID_MAX_LENGTH`: The maximum length of videoGallery IDs.
 */
const VIDEO_GALLERY_ID_PREFIX = 'videoGallery';
const VIDEO_GALLERY_ID_MIN_LENGTH = 19;
const VIDEO_GALLERY_ID_MAX_LENGTH = 19;

/**
 * Constants for defining minimum and maximum length of various videoGallery properties.
 * - `PROPERTY_TITLE_MIN_LENGTH`: Minimum length of the videoGallery's name.
 * - `PROPERTY_TITLE_MAX_LENGTH`: Maximum length of the videoGallery's name.
 */
const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 500;

/**
 * Exported an object containing all the constants for the videoGallery module.
 * These constants are used throughout the application for generating and validating videoGallery-related data.
 */
export const VIDEO_GALLERY_CONSTANTS = {
    VIDEO_GALLERY_ID_PREFIX,
    VIDEO_GALLERY_ID_MIN_LENGTH,
    VIDEO_GALLERY_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};