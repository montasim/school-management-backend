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
    FILE_EXTENSION_TYPE_JPG
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
              'any.only': `"fieldname" should be one of [${allowedFieldname}]`,
              'any.required': `"fieldname" is a required field`
          }),
      originalname: createFileNameSchema(allowedExtensions)
          .messages({
              'string.pattern.base': `"originalname" should have one of the following extensions: ${allowedExtensions.join(', ')}`,
              'any.required': `"originalname" is a required field`
          }),
      encoding: Joi.string()
          .valid('7bit')
          .required()
          .messages({
              'string.base': `"encoding" should be a type of 'text'`,
              'any.only': `"encoding" should be '7bit'`,
              'any.required': `"encoding" is a required field`
          }),
      mimetype: Joi.string()
          .valid(...validMimeTypes)
          .required()
          .messages({
              'string.base': `"mimetype" should be a type of 'text'`,
              'any.only': `"mimetype" should be one of [${validMimeTypes.join(', ')}]`,
              'any.required': `"mimetype" is a required field`
          }),
      buffer: fileBufferValidationSchema(),
      size: Joi.number()
          .max(1024 * 1024 * 25)
          .required()
          .messages({
              'number.base': `"size" should be a number`,
              'number.max': `"size" must not exceed 25MB`,
              'any.required': `"size" is a required field`
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
        file: fileValidationSchema("postImage", [...allowedFileExtensions], [MIME_TYPE_PNG, MIME_TYPE_JPG]),
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
const postBodyValidationSchema = () => {
    return Joi.object({
        title: JoiSchemaGenerators.createStringSchema('title', 3, 200),
        category: JoiSchemaGenerators.createStringSchema('category', 3, 100),
        description: JoiSchemaGenerators.createStringSchema('description', 3, 5000),
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
 * @description Joi validation schema for administration body data.
 * Validates the title, category, and description fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 50.
 * - `level`: Should be a string with a minimum length of 3 and a maximum length of 20.
 * - `level`: Should be a string with a minimum length of 3 and a maximum length of 50.
 */
const administrationBodyValidationSchema = () => {
    return Joi.object({
        name: JoiSchemaGenerators.createStringSchema('name', 3, 50),
        category: JoiSchemaGenerators.createStringSchema('category', 3, 20),
        designation: JoiSchemaGenerators.createStringSchema('designation', 3, 50),
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
 * Creates a Joi string schema with provided specifications.
 *
 * @param {string} fieldName - The name of the field to be validated.
 * @param {number} minLength - The minimum length of the string.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {Joi.StringSchema} - The Joi string schema.
 */
const createStringSchema = (fieldName, minLength, maxLength) => {
    return Joi.string()
        .min(minLength)
        .max(maxLength)
        .required()
        .messages({
            'string.base': `"${fieldName}" should be a type of "text"`,
            'string.empty': `"${fieldName}" cannot be an empty field`,
            'string.min': `"${fieldName}" should have a minimum length of {#limit}`,
            'string.max': `"${fieldName}" should have a maximum length of {#limit}`,
            'any.required': `"${fieldName}" is a required field`
        });
};

/**
 * Shared Joi schemas for file validation.
 */
export const JoiSchemaGenerators = {
  carouselBodyValidationSchema,
  studentBodyValidationSchema,
  administrationBodyValidationSchema,
  fileValidationSchema,
  fileWithTitleValidationSchema,
  createFileNameSchema,
  postBodyValidationSchema,
  uriValidationSchema,
  createStringSchema,
  websiteConfigurationBodyValidationSchema,
};