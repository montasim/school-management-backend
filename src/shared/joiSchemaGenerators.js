/**
 * @fileoverview Joi Schema Generators for Various Data Types.
 *
 * This module contains a collection of functions that generate Joi validation schemas. These schemas are used
 * throughout the application to validate different types of data, including file names, file titles, URIs, and
 * file buffers. The module leverages the Joi library to create detailed and specific validation rules, ensuring
 * data integrity and adherence to expected formats. It includes schemas for validating file properties like
 * MIME types and extensions, and general data like titles and URIs. By centralizing these schema generators,
 * the application can maintain consistent validation logic across various routes and modules.
 *
 * @requires Joi - Library for schema description and data validation.
 * @requires constants - Application constants for MIME types and file extensions.
 * @module JoiSchemaGenerators - Exported functions for generating Joi validation schemas.
 */

import Joi from "joi";
import {
    MIME_TYPE_PDF,
    MIME_TYPE_PNG,
    MIME_TYPE_JPG,
    FILE_EXTENSION_TYPE_PDF,
    FILE_EXTENSION_TYPE_PNG,
    FILE_EXTENSION_TYPE_JPG,
    MAXIMUM_FILE_SIZE,
    BLOG_PROPERTY_TITLE_MIN_LENGTH,
    BLOG_PROPERTY_TITLE_MAX_LENGTH,
    BLOG_PROPERTY_CATEGORY_MIN_LENGTH,
    BLOG_PROPERTY_DESCRIPTION_MIN_LENGTH,
    BLOG_PROPERTY_DESCRIPTION_MAX_LENGTH,
    BLOG_PROPERTY_CATEGORY_MAX_LENGTH
} from "../constants/constants.js";

/**
 * Generate a Joi regex pattern for allowed extensions.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @returns {string} Regex pattern for allowed extensions.
 */
const generateExtensionRegexPattern = ( allowedExtensions ) => {
  return `(${allowedExtensions.join('|')})$`;
};

/**
 * Create a Joi schema for validating file names with allowed extensions.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @returns {Joi.StringSchema} Joi schema for validating file names.
 */
const createFileNameSchema = ( allowedExtensions ) => {
  const regexPattern = generateExtensionRegexPattern(allowedExtensions);

  return Joi.string()
    .regex(new RegExp(regexPattern))
    .min(1)
    .max(255)
    .required()
    .messages({
      'string.base': 'File name must be a string',
      'string.empty': 'File name cannot be empty',
      'string.min': 'File name must be at least {#limit} characters long',
      'string.max': 'File name must be at most {#limit} characters long',
      'any.required': 'File name is required',
      'string.pattern.base': `File name is not in a valid format. It should contain only letters, numbers, underscores, hyphens, and spaces, and have one of the following extensions: ${allowedExtensions}`,
    });
};

/**
 * Create a Joi schema for validating file buffer.
 *
 * @returns {Joi.StringSchema} Joi schema for validating file buffer.
 */
const fileBufferValidationSchema = () => {
  return Joi.binary()
      .max(1024 * 1024 * 25) // Example size limit of 25MB
      .required()
      .messages({
          'binary.base': 'Buffer must be a valid binary buffer',
          'binary.max': 'Buffer size must not exceed 25MB',
          'any.required': 'Buffer is a required field'
      })
};

/**
 * Create a Joi schema for validating files.
 *
 * @param allowedFieldname
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @param validMimeTypes
 * @returns {Joi.ObjectSchema} Joi schema for validating files.
 */
const fileValidationSchema = (allowedFieldname, allowedExtensions = [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], validMimeTypes = [MIME_TYPE_PNG, MIME_TYPE_JPG] ) => {
  return Joi.object({
      fieldname: Joi.string()
          .valid(allowedFieldname)
          .required()
          .messages({
              'string.base': `"fieldname" should be a type of 'text'`,
              'any.only': `"File should be one of [${allowedFieldname}]`,
              'any.required': `Invalid or empty file`
          }),
      originalname: createFileNameSchema(allowedExtensions)
          .messages({
              'string.pattern.base': `File should have one of the following extensions: ${allowedExtensions.join(', ')}`,
              'any.required': `Invalid or empty file`
          }),
      encoding: Joi.string()
          .valid('7bit')
          .required()
          .messages({
              'string.base': `"encoding" should be a type of 'text'`,
              'any.only': `Invalid or empty file`,
              'any.required': `Invalid or empty file`
          }),
      mimetype: Joi.string()
          .valid(...validMimeTypes)
          .required()
          .messages({
              'string.base': `"mimetype" should be a type of 'text'`,
              'any.only': `Invalid or empty file`,
              'any.required': `Invalid or empty file`
          }),
      buffer: fileBufferValidationSchema(),
      size: Joi.number()
          .max(MAXIMUM_FILE_SIZE)
          .required()
          .messages({
              'number.base': `"size" should be a number`,
              'number.max': `"size" must not exceed 1.1MB`,
              'any.required': `File must not exceed 1.1MB`
          })
  }).description('File to be uploaded with validated MIME type and size.')
};

/**
 * Create a Joi schema for validating PDF files with a title.
 *
 * @param {string[]} allowedFileExtensions - Array of allowed file extensions.
 * @param validMimeTypes
 * @returns {Joi.ObjectSchema} Joi schema for validating PDF files with a title.
 */
const fileWithTitleValidationSchema = (allowedFileExtensions = [FILE_EXTENSION_TYPE_PDF], validMimeTypes = [MIME_TYPE_PDF]) => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema('title', 3, 200),
        file: fileValidationSchema("postImage", [...allowedFileExtensions], [...validMimeTypes]),
    }).required();
};

/**
 * @description Joi validation schema for website configuration body data.
 * Validates the name and slogan fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `slogan`: Should be a string with a minimum length of 3 and a maximum length of 100.
 */
const websiteConfigurationBodyValidationSchema = () => {
    return Joi.object({
        name: JoiSchemaGenerators.createStringSchema('name', 3, 100),
        slogan: JoiSchemaGenerators.createStringSchema('slogan', 3, 100),
    });
}

/**
 * @description Joi validation schema for blogPost body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 1000.
 * - `category`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 5000.
 */
const newPostBodyValidationSchema = () => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema(
            'title',
            BLOG_PROPERTY_TITLE_MIN_LENGTH,
            BLOG_PROPERTY_TITLE_MAX_LENGTH
        ).required(),
        category: JoiSchemaGenerators.createStringSchema(
            'category',
            BLOG_PROPERTY_CATEGORY_MIN_LENGTH,
            BLOG_PROPERTY_CATEGORY_MAX_LENGTH
        ).required(),
        description: JoiSchemaGenerators.createStringSchema(
            'description',
            BLOG_PROPERTY_DESCRIPTION_MIN_LENGTH,
            BLOG_PROPERTY_DESCRIPTION_MAX_LENGTH
        ).required(),
    });
}

/**
 * @description Joi validation schema for updating blogPost body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 1000.
 * - `category`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 5000.
 */
const updatePostBodyValidationSchema = () => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema(
            'title',
            BLOG_PROPERTY_TITLE_MIN_LENGTH,
            BLOG_PROPERTY_TITLE_MAX_LENGTH
        ),
        category: JoiSchemaGenerators.createStringSchema(
            'category',
            BLOG_PROPERTY_CATEGORY_MIN_LENGTH,
            BLOG_PROPERTY_CATEGORY_MAX_LENGTH
        ),
        description: JoiSchemaGenerators.createStringSchema(
            'description',
            BLOG_PROPERTY_DESCRIPTION_MIN_LENGTH,
            BLOG_PROPERTY_DESCRIPTION_MAX_LENGTH
        ),
    });
}

/**
 * @description Joi validation schema for student body data.
 * Validates the title, category, and description fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 50.
 * - `level`: Should be a string with a minimum length of 3 and a maximum length of 20.
 */
const studentBodyValidationSchema = () => {
    return Joi.object({
        name: JoiSchemaGenerators.createStringSchema('name', 3, 50),
        level: JoiSchemaGenerators.createStringSchema('level', 3, 20),
    });
}

/**
 * @description Joi validation schema for admission information body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 50.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 50.
 * - `formFee`: Should be a string with a minimum length of 3 and a maximum length of 20.
 * - `admissionFee`: Should be a string with a minimum length of 3 and a maximum length of 50.
 * - `lastFormSubmissionDate`: Should be a string with a minimum length of 3 and a maximum length of 50.
 */
const admissionInformationBodyValidationSchema = () => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema('title', 3, 1000),
        description: JoiSchemaGenerators.createStringSchema('description', 3, 3000),
        formFee: JoiSchemaGenerators.createStringSchema('formFee', 1, 50),
        admissionFee: JoiSchemaGenerators.createStringSchema('admissionFee', 1, 50),
        lastFormSubmissionDate: JoiSchemaGenerators.createStringSchema('lastFormSubmissionDate', 1, 50),
    });
}

/**
 * @description Joi validation schema for blogPost body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 1000.
 * - `category`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 5000.
 */
const carouselBodyValidationSchema = () => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema('title', 3, 200),
    });
}

/**
 * @typedef {Object} UriValidationSchema
 * @property {string} uriValidationSchema - The schema of the link.
 */
const uriValidationSchema = () => {
    return Joi.string().uri().required().messages({
        'string.uri': 'Link must be a valid URI.',
        'any.required': 'Link is required.'
    });
}

/**
 * Creates a Joi mobile number schema with provided specifications.
 *
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {Joi.StringSchema} - The Joi string schema.
 */
const createEmailSchema = (minLength, maxLength) => {
    return Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: true } })
        .regex(/^((?!tempmail|mailinator|yopmail).)*$/, 'no-temp-email')
        .min(minLength)
        .max(maxLength)
        .required()
        .messages({
            'string.email': '"email" must be a valid email address',
            'string.min': `"email" should have a minimum length of ${minLength}`,
            'string.max': `"email" should have a maximum length of ${maxLength}`,
            'string.pattern.name': '"email" must not be a temporary email address',
            'string.regex.no-temp-email': '"email" must not be from a temporary email provider (like tempmail, mailinator, or yopmail)',
            'any.required': '"email" is a required field',
        })
};

/**
 * Creates a Joi mobile number schema with provided specifications.
 *
 * @param {string} fieldName - The name of the field to be validated.
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {Joi.StringSchema} - The Joi string schema.
 */
const createMobileNumberSchema = (fieldName, minLength, maxLength) => {
    return Joi.string()
        .pattern(/^(?:\+8801|01)[3-9]\d{8}$/)
        .min(minLength)
        .max(maxLength)
        .required()
        .messages({
            'string.pattern.base': `"${fieldName}" must be a valid Bangladeshi phone number (country code +880 is optional)`,
            'string.min': `"${fieldName}" should have a minimum length of 10 characters (without country code)`,
            'string.max': `"${fieldName}" should have a maximum length of 14 characters (with country code +880)`,
            'any.required': `"${fieldName}" is a required field`,
        })
};

/**
 * Creates a Joi string schema with provided specifications.
 *
 * @param {string} fieldName - The name of the field to be validated.
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {Joi.StringSchema} - The Joi string schema.
 */
const createStringSchema = (fieldName, minLength, maxLength) => {
    return Joi.string()
        .min(minLength) // Minimum length
        .max(maxLength) // Maximum length
        .trim() // Trims leading and trailing whitespace
        .messages({
            'string.base': `"${fieldName}" should be a type of "text"`,
            'string.empty': `"${fieldName}" cannot be an empty field`,
            'string.min': `"${fieldName}" should have a minimum length of {#limit}`,
            'string.max': `"${fieldName}" should have a maximum length of {#limit}`,
            'string.trim': `"${fieldName}" should not have leading or trailing spaces`,
        });
};

/**
 * Shared Joi schemas for file validation.
 */
export const JoiSchemaGenerators = {
  carouselBodyValidationSchema,
  studentBodyValidationSchema,
  fileValidationSchema,
  fileWithTitleValidationSchema,
  createFileNameSchema,
  newPostBodyValidationSchema,
  updatePostBodyValidationSchema,
  uriValidationSchema,
  createStringSchema,
  createMobileNumberSchema,
  createEmailSchema,
  websiteConfigurationBodyValidationSchema,
  admissionInformationBodyValidationSchema,
};