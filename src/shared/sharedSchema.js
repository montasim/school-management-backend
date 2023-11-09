import Joi from "joi";
import {MIME_TYPE_PDF, MIME_TYPE_PNG, MIME_TYPE_JPG, FILE_EXTENSION_TYPE_PDF} from "../constants/constants.js";

/**
 * Generate a Joi regex pattern for allowed extensions.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @returns {string} Regex pattern for allowed extensions.
 */
const generateExtensionPattern = ( allowedExtensions ) => {
  return `^[a-zA-Z0-9_\\- ]+\\.(${allowedExtensions})$`;
};

/**
 * Create a Joi schema for validating file names with allowed extensions.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @returns {Joi.StringSchema} Joi schema for validating file names.
 */
const createFileNameSchema = ( allowedExtensions ) => {
  const extensionPattern = generateExtensionPattern(allowedExtensions);

  return Joi.string()
    .regex(new RegExp(extensionPattern))
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
const createFileTitleSchema = () => {
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
const createFileBufferSchema = () => {
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
const createFileMimeTypeSchema = ( validMimeType = [MIME_TYPE_PDF] ) => {
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
const createFileSchema = ( allowedExtensions, validMimeType = [MIME_TYPE_PNG, MIME_TYPE_JPG] ) => {
  return Joi.object({
    fileName: createFileNameSchema(allowedExtensions),
    fileBuffer: createFileBufferSchema(),
    mimeType: createFileMimeTypeSchema(validMimeType),
  }).required();
};

/**
 * Create a Joi schema for validating PDF files with a title.
 *
 * @param {string[]} allowedExtensions - Array of allowed file extensions.
 * @param validMimeType
 * @returns {Joi.ObjectSchema} Joi schema for validating PDF files with a title.
 */
const createFileWithTitleSchema = (allowedExtensions = [FILE_EXTENSION_TYPE_PDF], validMimeType = [MIME_TYPE_PDF]) => {
    return Joi.object({
        title: createFileTitleSchema(),
        file: Joi.object({
            fieldname: Joi.string().valid('file').required(),
            originalname: createFileNameSchema(allowedExtensions),
            encoding: Joi.string().valid('7bit').required(),
            mimetype: Joi.string().valid(...validMimeType).required(),
            size: Joi.number().max(1024 * 1024 * 25).required() // Size limit set to 25MB as an example
        }).description('File to be uploaded with validated MIME type and size.')
    }).required();
};

/**
 * @typedef {Object} Title
 * @property {string} title - The title of the link.
 */
const titleSchema = () => {
    return Joi.string().min(1).max(100).required().messages({
        'string.base': 'Title must be a string.',
        'string.min': 'Title must be at least 1 character long.',
        'string.max': 'Title must not exceed 100 characters.',
        'any.required': 'Title is required.'
    });
};

/**
 * @typedef {Object} LinkSchema
 * @property {string} linkSchema - The schema of the link.
 */
const linkSchema = () => {
    return Joi.string().uri().required().messages({
        'string.uri': 'Link must be a valid URI.',
        'any.required': 'Link is required.'
    });
}

/**
 * Shared Joi schemas for file validation.
 */
export const SharedSchema = {
  createFileSchema,
  createFileWithTitleSchema,
  createFileNameSchema,
  titleSchema,
  linkSchema
};