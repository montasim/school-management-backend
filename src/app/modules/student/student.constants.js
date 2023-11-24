/**
 * @fileoverview Constants for Student Module.
 *
 * This module defines constants used in the student module, particularly for ID generation and validation,
 * as well as property length constraints. These constants ensure consistent ID formats and validate the length of
 * various fields associated with students, such as name, category, and designation. The constants are used
 * throughout the student module to maintain standardization and data integrity.
 *
 * @module STUDENT_CONSTANTS
 */

/**
 * Constants for student ID prefix and length constraints.
 * - `STUDENT_ID_PREFIX`: The standard prefix used for student IDs.
 * - `STUDENT_ID_MIN_LENGTH`: The minimum length of student IDs.
 * - `STUDENT_ID_MAX_LENGTH`: The maximum length of student IDs.
 */
const STUDENT_ID_PREFIX = 'student';
const STUDENT_ID_MIN_LENGTH = 14;
const STUDENT_ID_MAX_LENGTH = 14;

/**
 * Constants for defining minimum and maximum length of various student properties.
 * - `PROPERTY_NAME_MIN_LENGTH`: Minimum length of the student's name.
 * - `PROPERTY_NAME_MAX_LENGTH`: Maximum length of the student's name.
 * - `PROPERTY_LEVEL_MIN_LENGTH`: Minimum length of the student's category.
 * - `PROPERTY_LEVEL_MAX_LENGTH`: Maximum length of the student's category.
 * - `PROPERTY_DESIGNATION_MIN_LENGTH`: Minimum length of the student's designation.
 * - `PROPERTY_DESIGNATION_MAX_LENGTH`: Maximum length of the student's designation.
 */
const PROPERTY_NAME_MIN_LENGTH = 3;
const PROPERTY_NAME_MAX_LENGTH = 50;
const PROPERTY_LEVEL_MIN_LENGTH = 3;
const PROPERTY_LEVEL_MAX_LENGTH = 90;

/**
 * Exported an object containing all the constants for the student module.
 * These constants are used throughout the application for generating and validating student-related data.
 */
export const STUDENT_CONSTANTS = {
    STUDENT_ID_PREFIX,
    STUDENT_ID_MIN_LENGTH,
    STUDENT_ID_MAX_LENGTH,
    PROPERTY_NAME_MIN_LENGTH,
    PROPERTY_NAME_MAX_LENGTH,
    PROPERTY_LEVEL_MIN_LENGTH,
    PROPERTY_LEVEL_MAX_LENGTH,
};