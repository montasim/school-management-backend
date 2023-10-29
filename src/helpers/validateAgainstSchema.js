/**
 * @file validator.js
 * @description This module provides utility functions for data validation against schemas.
 * It exports a reusable function to validate data using a provided schema and handle error responses.
 * @module Validator
 */

/**
 * Reusable function to validate data against a schema and handle error responses.
 * @param {Schema} schema - The Joi schema to validate data against
 * @param {*} data - The data to be validated against the schema
 * @param {object} res - Express response object to send error responses
 * @returns {void} Sends a bad request error response if validation fails
 */
const validateAgainstSchema = (schema, data, res) => {
  const { error } = schema.validate(data);

  if (error) {
    console.log(res, 400, error.details[0].message);
  }
};

export default validateAgainstSchema;
