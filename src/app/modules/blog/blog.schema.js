import Joi from "joi";
import { ID_CONSTANTS } from './blog.constants.js';
import { JoiSchemaGenerators } from "../../../shared/joiSchemaGenerators.js";
import createIdSchema from "../../../shared/createIdSchema.js";
import { 
    FILE_EXTENSION_TYPE_PNG, 
    MIME_TYPE_PNG, 
    MIME_TYPE_JPG,
 } from "../../../constants/constants.js";

const blogPostParams = Joi.object({
    blogPostId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_POST_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for blogPost body data.
 * Validates the title, category, and description fields.
 *
 * - `title`: Should be a string with a minimum length of 3 and a maximum length of 1000.
 * - `category`: Should be a string with a minimum length of 3 and a maximum length of 100.
 * - `description`: Should be a string with a minimum length of 3 and a maximum length of 5000.
 */
const blogPostBody = Joi.object({
    title: Joi.string()
        .min(3)
        .max(1000)
        .required()
        .messages({
            'string.base': '"title" should be a type of "text"',
            'string.empty': '"title" cannot be an empty field',
            'string.min': '"title" should have a minimum length of {#limit}',
            'string.max': '"title" should have a maximum length of {#limit}',
            'any.required': '"title" is a required field'
        }),
    category: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.base': '"category" should be a type of "text"',
            'string.empty': '"category" cannot be an empty field',
            'string.min': '"category" should have a minimum length of {#limit}',
            'string.max': '"category" should have a maximum length of {#limit}',
            'any.required': '"category" is a required field'
        }),
    postImage: JoiSchemaGenerators.fileValidationSchema([FILE_EXTENSION_TYPE_PNG], [MIME_TYPE_PNG, MIME_TYPE_JPG]),
    description: Joi.string()
        .min(3)
        .max(5000)
        .required()
        .messages({
            'string.base': '"description" should be a type of "text"',
            'string.empty': '"description" cannot be an empty field',
            'string.min': '"description" should have a minimum length of {#limit}',
            'string.max': '"description" should have a maximum length of {#limit}',
            'any.required': '"description" is a required field'
        }),
});

/**
 * @namespace BlogPostSchema
 * @description Exported Joi validation schemas for blogPost data.
 *
 * - `blogPostBodySchema`: Validates the body data of an blogPost.
 * - `blogPostParamsSchema`: Validates the blogPost ID in request parameters.
 */
export const BlogPostSchema = {
    blogPostBody,
    blogPostParams,
};