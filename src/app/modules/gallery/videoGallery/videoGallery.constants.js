/**
 * @fileoverview Constants for Video Gallery Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating video gallery data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the video gallery ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */


const VIDEO_GALLERY_ID_PREFIX = 'videoGallery';
const VIDEO_GALLERY_ID_MIN_LENGTH = 19;
const VIDEO_GALLERY_ID_MAX_LENGTH = 19;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const VIDEO_GALLERY_CONSTANTS = {
    VIDEO_GALLERY_ID_PREFIX,
    VIDEO_GALLERY_ID_MIN_LENGTH,
    VIDEO_GALLERY_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};