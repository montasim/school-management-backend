import Joi from "joi";
import { ID_CONSTANTS } from './homePageCarousel.constants.js';
import createIdSchema from "../../../shared/createIdSchema.js";

const homePageCarouselParamsSchema = Joi.object({
    homePageCarouselId: createIdSchema(ID_CONSTANTS?.HOME_PAGE_CAROUSEL_PREFIX, ID_CONSTANTS).required()
});

/**
 * @description Joi validation schema for homePageCarousel's body data.
 * Validates the name, level, and image fields.
 *
 * - `name`: Should be a string with a minimum length of 3 and a maximum length of 30.
 * - `level`: Should be a string with a minimum length of 2 and a maximum length of 20.
 * - `image`: Should be a string that matches the IMAGE_PATTERN.
 */
const homePageCarouselBodySchema = Joi.object({
    imageDescription: Joi.string().min(1).max(100).required().messages({
        'string.base': 'Image description must be a string.',
        'string.min': 'Image description must be at least 1 character long.',
        'string.max': 'Image description must not exceed 100 characters.',
        'any.required': 'Image description is required.'
    }),
    imageLink: Joi.string().uri().required().messages({
        'string.uri': 'Image link must be a valid URI.',
        'any.required': 'Image link is required.'
    }),
});

/**
 * @namespace HomePageCarouselSchema
 * @description Exported Joi validation schemas for homePageCarousel data.
 *
 * - `homePageCarouselBodySchema`: Validates the body data of a homePageCarousel.
 * - `homePageCarouselParamsSchema`: Validates the homePageCarousel ID in request parameters.
 */
export const HomePageCarouselSchema = {
    homePageCarouselBodySchema,
    homePageCarouselParamsSchema,
};