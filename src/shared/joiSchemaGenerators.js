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
  return `^[a-zA-Z0-9_\\- ]+\\.(${allowedExtensions})$`;
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
 * Create a Joi schema for validating file title.
 *
 * @returns {Joi.StringSchema} Joi schema for validating file title.
 */
const fileTitleValidationSchema = () => {
  return Joi.string()
    .min(1)
    .max(255)
    .required()
    .description('Title of the file, used for identification.');
};

/**
 * Create a Joi schema for validating file buffer.
 *
 * @returns {Joi.StringSchema} Joi schema for validating file buffer.
 */
const fileBufferValidationSchema = () => {
  return Joi.string()
    .base64()
    .required()
    .description('The base64 encoded data of the file.');
};

/**
 * Create a Joi schema for validating file MIME type.
 *
 * @returns {Joi.StringSchema} Joi schema for validating file MIME type.
 */
const fileMimeTypeValidationSchema = ( validMimeType = [MIME_TYPE_PDF] ) => {
  return Joi.string()
    .valid(...validMimeType)
    .required()
    .description('MIME type of the file.');
};

/**
 * Create a Joi schema for validating files.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @param validMimeType
 * @returns {Joi.ObjectSchema} Joi schema for validating files.
 */
const fileValidationSchema = (allowedExtensions = [FILE_EXTENSION_TYPE_PNG, FILE_EXTENSION_TYPE_JPG], validMimeType = [MIME_TYPE_PNG, MIME_TYPE_JPG] ) => {
  return Joi.object({
    fileName: createFileNameSchema(allowedExtensions),
    fileBuffer: fileBufferValidationSchema(),
    mimeType: fileMimeTypeValidationSchema(validMimeType),
  }).required();
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
        title: fileTitleValidationSchema(),
        file: Joi.object({
            fieldname: Joi.string().valid('file').required(),
            originalname: createFileNameSchema(allowedFileExtensions),
            encoding: Joi.string().valid('7bit').required(),
            mimetype: Joi.string().valid(...validMimeTypes).required(),
            size: Joi.number().max(1024 * 1024 * 25).required() // Size limit set to 25MB as an example
        }).description('File to be uploaded with validated MIME type and size.')
    }).required();
};

/**
 * @typedef {Object} Title
 * @property {string} title - The title of the link.
 */
const titleValidationSchema = () => {
    return Joi.string().min(1).max(100).required().messages({
        'string.base': 'Title must be a string.',
        'string.min': 'Title must be at least 1 character long.',
        'string.max': 'Title must not exceed 100 characters.',
        'any.required': 'Title is required.'
    });
};

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
 * Shared Joi schemas for file validation.
 */
export const JoiSchemaGenerators = {
  fileValidationSchema,
  fileWithTitleValidationSchema,
  createFileNameSchema,
  titleValidationSchema,
  uriValidationSchema,
  fileTitleValidationSchema,
};