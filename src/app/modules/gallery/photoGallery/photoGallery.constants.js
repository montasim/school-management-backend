/**
 * @fileoverview Constants for Photo Gallery Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating photo gallery data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the photo gallery ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */

const PHOTO_GALLERY_ID_PREFIX = 'photoGallery';
const PHOTO_GALLERY_ID_MIN_LENGTH = 19;
const PHOTO_GALLERY_ID_MAX_LENGTH = 19;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const PHOTO_GALLERY_CONSTANTS = {
    PHOTO_GALLERY_ID_PREFIX,
    PHOTO_GALLERY_ID_MIN_LENGTH,
    PHOTO_GALLERY_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};