/**
 * @fileoverview Constants for Others Information Category ID Generation and Validation.
 *
 * This module exports a set of constants used throughout the application for managing Others Information Category IDs.
 * These constants include a designated prefix for Others Information Category IDs, and defined minimum and maximum lengths.
 * They play a crucial role in standardizing the format of Others Information Category IDs across the application,
 * ensuring consistency in ID structure and facilitating easier validation and management of these identifiers.
 *
 * The constants defined here are used in various parts of the application, particularly in validation schemas
 * and wherever Others Information Category IDs are generated or processed. This centralized definition of ID-related constants
 * helps maintain uniformity and reduces the likelihood of errors in ID handling.
 *
 * @module OTHERS_INFORMATION_CATEGORY_CONSTANTS - Exports constants for Category ID management.
 */

const OTHERS_INFORMATION_CATEGORY_ID_PREFIX = 'othersInformationCategory';
const OTHERS_INFORMATION_CATEGORY_ID_MIN_LENGTH = 32;
const OTHERS_INFORMATION_CATEGORY_ID_MAX_LENGTH = 32;

const OTHERS_INFORMATION_CATEGORY_NAME_MIN_LENGTH = 3;
const OTHERS_INFORMATION_CATEGORY_NAME_MAX_LENGTH = 30;

/**
 * @constant OTHERS_INFORMATION_CATEGORY_CONSTANTS
 * @description Provides constants for Category ID creation and validation.
 * - `OTHERS_INFORMATION_CATEGORY_ID_PREFIX`: The prefix to be used in Category IDs.
 * - `OTHERS_INFORMATION_CATEGORY_ID_MIN_LENGTH`: The minimum length of a valid Category ID.
 * - `OTHERS_INFORMATION_CATEGORY_ID_MAX_LENGTH`: The maximum length of a valid Category ID.
 * Ensures consistency in the length and format of Category IDs across the application.
 */
export const OTHERS_INFORMATION_CATEGORY_CONSTANTS = {
    OTHERS_INFORMATION_CATEGORY_ID_PREFIX,
    OTHERS_INFORMATION_CATEGORY_ID_MIN_LENGTH,
    OTHERS_INFORMATION_CATEGORY_ID_MAX_LENGTH,
    OTHERS_INFORMATION_CATEGORY_NAME_MIN_LENGTH,
    OTHERS_INFORMATION_CATEGORY_NAME_MAX_LENGTH,
};