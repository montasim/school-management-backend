/**
 * @file authorizationHeaderSchema.js
 * @description This file defines a Joi schema for validating an authorization header.
 * It ensures that the provided header matches the expected SECRET_TOKEN.
 * @module AuthorizationHeaderSchema
 */

import Joi from "joi";
import { SECRET_TOKEN } from "../constants/index.js";

/**
 * Joi schema for validating an authorization header.
 *
 * @constant {object}
 * @default
 */
const authorizationHeaderSchema = Joi.string().required().valid(SECRET_TOKEN);

export default authorizationHeaderSchema;
