/**
 * @fileoverview Constants for Home Page Carousel Validation.
 *
 * This file defines a set of constants used throughout the application, specifically for
 * validating home page carousel data. These constants include various parameters like ID prefixes,
 * minimum and maximum lengths for different form fields such as the home page carousel ID and
 * property titles. Defining these constants in a separate file ensures consistency and ease of
 * maintenance, as they can be easily updated and reused across different parts of the application.
 */

const HOME_PAGE_CAROUSEL_ID_PREFIX = 'homePageCarousel';
const HOME_PAGE_CAROUSEL_ID_MIN_LENGTH = 23;
const HOME_PAGE_CAROUSEL_ID_MAX_LENGTH = 23;

const PROPERTY_TITLE_MIN_LENGTH = 3;
const PROPERTY_TITLE_MAX_LENGTH = 200;

export const HOME_PAGE_CAROUSEL_CONSTANTS = {
    HOME_PAGE_CAROUSEL_ID_PREFIX,
    HOME_PAGE_CAROUSEL_ID_MIN_LENGTH,
    HOME_PAGE_CAROUSEL_ID_MAX_LENGTH,
    PROPERTY_TITLE_MIN_LENGTH,
    PROPERTY_TITLE_MAX_LENGTH,
};