import handleValidationError from "./handleValidationError.js";

/**
 * Generates a middleware to validate request data against a provided Joi schema.
 *
 * @function
 * @async
 * @param {Object} schema - The Joi schema to validate against.
 * @param {string} source - The location of the data on the request object. E.g., 'body', 'query', 'params'.
 * @returns {Function} Middleware function for validation.
 * @example
 * // Usage
 * router.post('/path', validateWithSchema(mySchema, 'body'), myController);
 */
const validateWithSchema = (schema, source) => async (req, res, next) => {
    try {
        const { error } = schema.validate(req[source]);

        console.log(req.params)

        if (error) {
            return handleValidationError(res, error);
        }

        next();
    } catch (error) {
        return res.status(500).json(error);
    }
};

export default validateWithSchema;