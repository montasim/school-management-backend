/**
 * @fileoverview Constants for Announcement ID Generation and Validation.
 *
 * This module exports a set of constants used throughout the application for managing Announcement IDs.
 * These constants include a designated prefix for Announcement IDs, and defined minimum and maximum lengths.
 * They play a crucial role in standardizing the format of Announcement IDs across the application,
 * ensuring consistency in ID structure and facilitating easier validation and management of these identifiers.
 *
 * The constants defined here are used in various parts of the application, particularly in validation schemas
 * and wherever Announcement IDs are generated or processed. This centralized definition of ID-related constants
 * helps maintain uniformity and reduces the likelihood of errors in ID handling.
 *
 * @module ANNOUNCEMENT_CONSTANTS - Exports constants for Announcement ID management.
 */

const ANNOUNCEMENT_ID_PREFIX = 'announcement';
const ANNOUNCEMENT_ID_MIN_LENGTH = 19;
const ANNOUNCEMENT_ID_MAX_LENGTH = 19;

const ANNOUNCEMENT_NAME_MIN_LENGTH = 3;
const ANNOUNCEMENT_NAME_MAX_LENGTH = 3000;

/**
 * @constant ANNOUNCEMENT_CONSTANTS
 * @description Provides constants for Announcement ID creation and validation.
 * - `ANNOUNCEMENT_ID_PREFIX`: The prefix to be used in Announcement IDs.
 * - `ANNOUNCEMENT_ID_MIN_LENGTH`: The minimum length of a valid Announcement ID.
 * - `ANNOUNCEMENT_ID_MAX_LENGTH`: The maximum length of a valid Announcement ID.
 * Ensures consistency in the length and format of Announcement IDs across the application.
 */
export const ANNOUNCEMENT_CONSTANTS = {
    ANNOUNCEMENT_ID_PREFIX,
    ANNOUNCEMENT_ID_MIN_LENGTH,
    ANNOUNCEMENT_ID_MAX_LENGTH,
    ANNOUNCEMENT_NAME_MIN_LENGTH,
    ANNOUNCEMENT_NAME_MAX_LENGTH,
};