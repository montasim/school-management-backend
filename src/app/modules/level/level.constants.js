/**
 * @fileoverview Constants for Level ID Generation and Validation.
 *
 * This module exports a set of constants used throughout the application for managing Level IDs.
 * These constants include a designated prefix for Level IDs, and defined minimum and maximum lengths.
 * They play a crucial role in standardizing the format of Level IDs across the application,
 * ensuring consistency in ID structure and facilitating easier validation and management of these identifiers.
 *
 * The constants defined here are used in various parts of the application, particularly in validation schemas
 * and wherever Level IDs are generated or processed. This centralized definition of ID-related constants
 * helps maintain uniformity and reduces the likelihood of errors in ID handling.
 *
 * @module LEVEL_CONSTANTS - Exports constants for Level ID management.
 */

const LEVEL_ID_PREFIX = 'level';
const LEVEL_ID_MIN_LENGTH = 18;
const LEVEL_ID_MAX_LENGTH = 18;

const PROPERTY_NAME_MIN_LENGTH = 3;
const PROPERTY_NAME_MAX_LENGTH = 40;

/**
 * @constant LEVEL_CONSTANTS
 * @description Provides constants for Level ID creation and validation.
 * - `LEVEL_ID_PREFIX`: The prefix to be used in Level IDs.
 * - `LEVEL_ID_MIN_LENGTH`: The minimum length of a valid Level ID.
 * - `LEVEL_ID_MAX_LENGTH`: The maximum length of a valid Level ID.
 * - `PROPERTY_NAME_MIN_LENGTH`: The minimum length of a valid name.
 * - `PROPERTY_NAME_MAX_LENGTH`: The maximum length of a valid name.
 * Ensures consistency in the length and format of Level IDs across the application.
 */
export const LEVEL_CONSTANTS = {
    LEVEL_ID_PREFIX,
    LEVEL_ID_MIN_LENGTH,
    LEVEL_ID_MAX_LENGTH,
    PROPERTY_NAME_MIN_LENGTH,
    PROPERTY_NAME_MAX_LENGTH
};