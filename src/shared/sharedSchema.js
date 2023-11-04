import Joi from "joi";

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
 * Create a Joi schema for validating PDF files.
 *
 * @returns {Joi.ObjectSchema} Joi schema for validating PDF files.
 */
const createFileSchema = ( allowedExtensions ) => {
  return Joi.object({
    title: Joi.string()
      .min(1)
      .max(255)
      .required()
      .description('Title of the file, used for identification.'),

    fileName: createFileNameSchema(allowedExtensions),

    fileBuffer: Joi.string()
      .base64()
      .required()
      .description('The base64 encoded data of the file.'),

    mimeType: Joi.string()
      .valid("application/pdf")
      .required()
      .description('MIME type of the file.')
  }).required();
};

/**
 * Shared Joi schemas for file validation.
 */
export const SharedSchema = {
  createFileSchema,
  createFileNameSchema
};