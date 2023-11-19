/**
 * @fileoverview Express Router for Contact Email Functionality.
 *
 * This module sets up an Express router for handling HTTP POST requests related to sending emails.
 * It defines a route for the email-sending functionality, including necessary validation of request data
 * and handling the actual email sending process. The router uses a specific validator to ensure the integrity
 * and correctness of the email-related data received in the request body. It then delegates the business logic
 * to the ContactController, which contains the implementation for processing and sending emails.
 * This approach ensures a clear separation of concerns and promotes better code organization and maintainability.
 *
 * @requires express - Express framework to create route handlers.
 * @requires ContactValidators - Validators for ensuring the integrity of contact-related data.
 * @requires ContactController - Controller that contains the logic for handling email-sending operations.
 * @module contactRouter - Exported Express router for contact-related routes.
 */

import express from "express";
import { ContactValidators } from "./contact.validator.js";
import { ContactController } from "./contact.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   homePagePost:
 *     summary: Send email.
 *     description: Endpoint to send email.
 *     parameters:
 *       - in: body
 *         name: firstName
 *         description: The first name of the sender.
 *         name: lastName,
 *         description: The last name of the sender.
 *         name: phone
 *         description: The phone number of the sender.
 *         name: email
 *         description: The email of the sender.
 *         name: subject
 *         description: The subject of the email.
 *         name: message
 *         description: The email message.
 *         schema:
 *           $ref: '#/definitions/send-email'
 *     responses:
 *       200:
 *         description: Emails send successfully.
 *       400:
 *         description: Bad request due to invalid parameters.
 *       500:
 *         description: Internal server error.
 */
router.post(
    "/send-email",
    ContactValidators.sendEmailBodyValidator,
    ContactController.sendEmailController
);

/**
 * Exports the router that contains contact-related routes.
 * @exports contactRoutes
 */
export default router;