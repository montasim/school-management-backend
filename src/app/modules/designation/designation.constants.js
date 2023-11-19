/**
 * @fileoverview Constants for Designation ID Generation and Validation.
 *
 * This module exports a set of constants used throughout the application for managing Designation IDs.
 * These constants include a designated prefix for Designation IDs, and defined minimum and maximum lengths.
 * They play a crucial role in standardizing the format of Designation IDs across the application,
 * ensuring consistency in ID structure and facilitating easier validation and management of these identifiers.
 *
 * The constants defined here are used in various parts of the application, particularly in validation schemas
 * and wherever Designation IDs are generated or processed. This centralized definition of ID-related constants
 * helps maintain uniformity and reduces the likelihood of errors in ID handling.
 *
 * @module DESIGNATION_CONSTANTS - Exports constants for Designation ID management.
 */

const DESIGNATION_ID_PREFIX = 'designation';
const DESIGNATION_ID_MIN_LENGTH = 21;
const DESIGNATION_ID_MAX_LENGTH = 21;

/**
 * @constant DESIGNATION_CONSTANTS
 * @description Provides constants for Designation ID creation and validation.
 * - `DESIGNATION_ID_PREFIX`: The prefix to be used in Designation IDs.
 * - `DESIGNATION_ID_MIN_LENGTH`: The minimum length of a valid Designation ID.
 * - `DESIGNATION_ID_MAX_LENGTH`: The maximum length of a valid Designation ID.
 * Ensures consistency in the length and format of Designation IDs across the application.
 */
export const DESIGNATION_CONSTANTS = {
    DESIGNATION_ID_PREFIX,
    DESIGNATION_ID_MIN_LENGTH,
    DESIGNATION_ID_MAX_LENGTH,
};