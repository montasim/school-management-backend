import { StatusCodes } from "http-status-codes";
import { AuthenticationSchema } from "./authentication.schema.js";

const loginValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.loginSchema.validate(req?.body);
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

const signupValidator = async (req, res, next) => {
    try {
        const { error } = AuthenticationSchema.signupSchema.validate(req?.params?.authenticationId);
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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
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
                status: StatusCodes.BAD_REQUEST,
                message: messages,
            };

            res.status(StatusCodes.BAD_REQUEST).json(returnData);
        } else {
            next();
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

export const AuthenticationValidators = {
    loginValidator,
    signupValidator,
    resetPasswordValidator,
    deleteUserValidator,
};
