import { NoticeSchema } from "./notice.schema.js";

/**
 * Middleware function to validate the creation of a new notice.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const noticeBodyValidator = async (req, res, next) => {
    try {
        const { error } = NoticeSchema.noticeBodySchema.validate(req?.body);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware function to validate fetching a notice by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const noticeParamsValidator = async (req, res, next) => {
    try {
        const { error } = NoticeSchema.noticeParamsSchema.validate(req?.params?.fileName);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware to validate the query parameters for deleting a notice.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteNoticeQueryValidator = async (req, res, next) => {
    try {
        const { error } = NoticeSchema.deleteNoticeQuerySchema.validate(req?.query?.requestedBy);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: 400,
                message: messages,
            };

            res.status(returnData?.status).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Collection of validator middlewares related to notice operations.
 * @typedef {Object} NoticeValidators
 * @property {function} noticeBodyValidator - Validates creation of new notice.
 * @property {function} noticeParamsValidator - Validates fetching a notice by its ID.
 */
export const NoticeValidators = {
    noticeBodyValidator,
    noticeParamsValidator,
    deleteNoticeQueryValidator
};
