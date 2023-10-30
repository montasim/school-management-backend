import { StudentSchema } from "./student.schema.js";

/**
 * Middleware function to validate the creation of a new student.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const studentBodyValidator = async (req, res, next) => {
    try {
        const { error } = StudentSchema.studentBodySchema.validate(req?.body);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware function to validate fetching a student by its ID.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @returns {void}
 */
const studentParamsValidator = async (req, res, next) => {
    try {
        const { error } = StudentSchema.studentParamsSchema.validate(req?.params?.studentId);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Middleware to validate the query parameters for deleting a student.
 *
 * @async
 * @function
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Callback to the next middleware or route.
 * @throws Will return a 400 BAD_REQUEST if the validation fails.
 * @throws Will return a 500 INTERNAL_SERVER_ERROR if any error occurs during validation.
 */
const deleteStudentQueryValidator = async (req, res, next) => {
    try {
        const { error } = StudentSchema.deleteStudentQuerySchema.validate(req?.query?.requestedBy);
        const messages = error?.details?.map(detail => detail?.message);

        if (error) {
            const returnData = {
                data: {},
                success: false,
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * Collection of validator middlewares related to student operations.
 * @typedef {Object} StudentValidators
 * @property {function} studentBodyValidator - Validates creation of new student.
 * @property {function} studentParamsValidator - Validates fetching a student by its ID.
 */
export const StudentValidators = {
    studentBodyValidator,
    studentParamsValidator,
    deleteStudentQueryValidator
};
