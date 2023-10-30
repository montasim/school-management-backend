import { AuthenticationSchema } from "./authentication.schema.js";

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

const deleteUserValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.deleteUserSchema.validate(req?.query?.requestedBy);
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

export const AuthenticationValidators = {
    loginValidator,
    signupValidator,
    resetPasswordValidator,
    deleteUserValidator,
};
