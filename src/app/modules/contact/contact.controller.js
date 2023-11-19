/**
 * @fileoverview Controller for Contact-related Operations in Express Application.
 *
 * This module exports the `ContactController`, which contains the `sendEmailController` function.
 * The `sendEmailController` is an asynchronous function designed to handle requests for sending emails.
 * It extracts relevant details from the Express request object, such as the sender's first name, last name, phone number, email address,
 * subject, and message. These details are then used to perform the email sending operation.
 * The module relies on the `ContactService` to handle the actual logic of sending emails and uses helper functions
 * for extracting data from the request and handling service responses.
 *
 * @module ContactController - Exports controllers for contact-related operations in an Express.js application.
 * @requires ContactService - Service module that contains the logic for sending emails.
 * @requires extractFromRequest - Helper function to extract data from the Express request object.
 * @requires handleServiceResponse - Helper function to handle the response from service operations.
 * @requires logger - Shared logging utility for error logging.
 */

import { ContactService } from "./contact.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";
import logger from "../../../shared/logger.js";

/**
 * Asynchronously handles requests for sending emails.
 *
 * @async
 * @function sendEmailController
 * @description Controller for sending an email. It extracts email-related data from the request and uses the ContactService to send the email.
 * @param {express.Request} req - Express request object containing sendEmailToDefaultEmailAddress details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const sendEmailController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            subject,
            message,
        } = extractFromRequest(req, ['firstName', 'lastName', 'phone', 'email', 'subject', 'message']);
        const emailDetails = {
            firstName,
            lastName,
            phone,
            email,
            subject,
            message,
        };

        await handleServiceResponse(res, ContactService.sendEmailService, emailDetails);
    } catch (error) {
        logger.error(error);

        return error;
    }
};

/**
 * Namespace for controllers handling sendEmailToDefaultEmailAddress operations.
 * @namespace ContactController
 */
export const ContactController = {
    sendEmailController,
};