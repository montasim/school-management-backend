import Joi from "joi";

const createCategorySchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    requestedBy: Joi.string().min(3).max(20).required(),
});

export const CategorySchema = {
    createCategorySchema,
};
