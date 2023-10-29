import { ContactSchema } from "./contact.schema.js";

const contactBodyValidator = async (req, res, next) => {
    try {
        const { error } = Schema.contactBodySchema.validate(req?.body);
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
 * Collection of validator middlewares related to contact operations.
 * @typedef {Object} ContactValidators
 * @property {function} contactBodyValidator - Validates contact body.
 */
export const ContactValidators = {
    contactBodyValidator,
};
