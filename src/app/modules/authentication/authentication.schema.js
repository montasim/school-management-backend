import Joi from "joi";

const loginSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
});

const signupSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
});

const resetPasswordSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirmPassword: Joi.string().min(3).max(20).required(),
});

const deleteUserSchema = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(3).max(20).required(),
    confirmPassword: Joi.string().min(3).max(20).required(),
});

export const AuthenticationSchema = {
    loginSchema,
    signupSchema,
    resetPasswordSchema,
    deleteUserSchema,
};
