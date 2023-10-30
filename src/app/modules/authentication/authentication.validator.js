import { AuthenticationSchema } from "./authentication.schema.js";

/**
 * Middleware to validate login request data.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const loginValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.loginSchema.validate(req?.body);
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
 * Middleware to validate signup request data.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const signupValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.signupSchema.validate(req?.body);
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
 * Middleware to validate adminId in request parameters.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticationParamsValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.authenticationParamsSchema.validate(req?.params?.adminId);
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
 * Middleware to validate query for deleting an admin.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const deleteAdminQueryValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.deleteAdminQuerySchema.validate(req?.query?.requestedBy);
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
 * Middleware to validate query for resetting password.
 * @async
 * @function
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const resetPasswordValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.resetPasswordSchema.validate(req?.query?.requestedBy);
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
 * @typedef {Object} AuthenticationValidators
 * @property {Function} loginValidator - Validates login request.
 * @property {Function} signupValidator - Validates signup request.
 * @property {Function} authenticationParamsValidator - Validates adminId in request params.
 * @property {Function} deleteAdminQueryValidator - Validates delete admin request.
 * @property {Function} resetPasswordValidator - Validates reset password request.
 */
export const AuthenticationValidators = {
    loginValidator,
    signupValidator,
    authenticationParamsValidator,
    resetPasswordValidator,
    deleteAdminQueryValidator,
};
