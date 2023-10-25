import { StatusCodes } from "http-status-codes";
import { CategorySchema } from "./category.schema.js";

const createCategoryValidator = async (req, res, next) => {
    try {
        const { error } = CategorySchema.createCategorySchema.validate(req.body);
        const messages = error?.details?.map(detail => detail.message);

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

export const CategoryValidators = {
    createCategoryValidator,
};
