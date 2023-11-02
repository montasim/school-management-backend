import validateWithSchema from "../../../helpers/validateWithSchema.js";
import { HomePageCarouselSchema } from "./homePageCarousel.schema.js";

/**
 * @function
 * @async
 * @description Middleware validator for homePageCarousel's body data.
 *
 * Uses the homePageCarouselBodySchema from the DashboardSchema to validate
 * the body of the incoming request. This ensures that the homePageCarousel's
 * information is in the correct format before processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const homePageCarouselBodyValidator = validateWithSchema(HomePageCarouselSchema.homePageCarouselBodySchema, 'body');

/**
 * @function
 * @async
 * @description Middleware validator for homePageCarousel's ID in request parameters.
 *
 * Uses the homePageCarouselParamsSchema from the DashboardSchema to validate
 * the homePageCarousel ID provided in the request parameters. This ensures that
 * the homePageCarousel ID is in the correct format for further processing.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 *
 * @returns {void}
 */
const homePageCarouselParamsValidator = await validateWithSchema(HomePageCarouselSchema.homePageCarouselParamsSchema, 'params');

/**
 * @namespace HomePageCarouselValidators
 * @description Exported homePageCarousel validators to be used in routes.
 */
export const HomePageCarouselValidators = {
    homePageCarouselBodyValidator,
    homePageCarouselParamsValidator,
};
