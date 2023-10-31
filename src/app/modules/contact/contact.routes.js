import express from "express";
import { ContactValidators } from "./contact.validator.js";
import { ContactController } from "./contact.controller.js";

const router = express.Router();

/**
 * @swagger
 * /:
 *   post:
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
