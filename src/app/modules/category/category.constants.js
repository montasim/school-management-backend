/**
 * @fileoverview Constants for Category ID Generation and Validation.
 *
 * This module exports a set of constants used throughout the application for managing Category IDs.
 * These constants include a designated prefix for Category IDs, and defined minimum and maximum lengths.
 * They play a crucial role in standardizing the format of Category IDs across the application,
 * ensuring consistency in ID structure and facilitating easier validation and management of these identifiers.
 *
 * The constants defined here are used in various parts of the application, particularly in validation schemas
 * and wherever Category IDs are generated or processed. This centralized definition of ID-related constants
 * helps maintain uniformity and reduces the likelihood of errors in ID handling.
 *
 * @module CATEGORY_CONSTANTS - Exports constants for Category ID management.
 */

const CATEGORY_ID_PREFIX = 'category';
const CATEGORY_ID_MIN_LENGTH = 15;
const CATEGORY_ID_MAX_LENGTH = 15;

/**
 * @constant CATEGORY_CONSTANTS
 * @description Provides constants for Category ID creation and validation.
 * - `CATEGORY_ID_PREFIX`: The prefix to be used in Category IDs.
 * - `CATEGORY_ID_MIN_LENGTH`: The minimum length of a valid Category ID.
 * - `CATEGORY_ID_MAX_LENGTH`: The maximum length of a valid Category ID.
 * Ensures consistency in the length and format of Category IDs across the application.
 */
export const CATEGORY_CONSTANTS = {
    CATEGORY_ID_PREFIX,
    CATEGORY_ID_MIN_LENGTH,
    CATEGORY_ID_MAX_LENGTH,
};