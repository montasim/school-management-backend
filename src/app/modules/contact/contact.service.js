/**
 * @fileoverview Service for Handling Email Sending Operations in Express Application.
 *
 * This module exports the `ContactService`, which includes the `sendEmailService` function.
 * The `sendEmailService` is an asynchronous function designed to handle email sending operations.
 * It constructs email content based on provided details like the sender's name, phone number, email, subject,
 * and message. The service uses a helper function `sendEmailToProvidedEmailAddress` to send emails to both
 * the school management and the sender, confirming the receipt of their message. It is designed to be used by
 * the controller layer for processing email sending requests.
 *
 * @module ContactService - Exported services for handling email sending operations.
 * @requires sendEmailToProvidedEmailAddress - Helper function to send emails.
 * @requires generateResponseData - Utility to generate standardized response data.
 * @requires config - Configuration settings including email recipient details.
 * @requires logger - Shared logging utility for error logging.
 */

import logger from "../../../shared/logger.js";
import sendEmailToProvidedEmailAddress from "../../../helpers/sendEmailToProvidedEmailAddress.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import { EMAIL_SERVICE_DESTINATION_EMAIL } from "../../../config/config.js";
import { EMAIL_RECIPIENTS, STATUS_OK } from "../../../constants/constants.js";
import contactEmailBody from "../../../shared/contactEmailBody.js";
import errorEmailBody from "../../../shared/errorEmailBody.js";

/**
 * Asynchronously sends emails based on provided details.
 *
 * @async
 * @function sendEmailService
 * @description Service function to send emails. It sends an email to the school management team and a confirmation email to the sender.
 * @param {Object} emailDetails - The details of the email to be sent, including sender's info and message content.
 * @returns {Promise<Object>} A promise that resolves to the response object after sending the email.
 * @throws {Error} If an error occurs during email sending.
 */
const sendEmailService = async ( emailDetails ) => {
    try {
        const { firstName, lastName, phone, email, subject } = emailDetails;
        const emailSubject = `School Management: ${subject}`
        const receiverEmailSubject = `Thank you for reaching out to us!`
        const receiverHtml = `
            <h3>Dear ${firstName} ${lastName},</h3>

            <p>We're glad to inform you that we have successfully received your message.</p>
            <p>We have noted your contact details as follows:</p>
            <ul>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Email:</strong> ${email}</li>
            </ul>
            
            <p>Thank you for getting in touch with us! We will respond to your query as soon as possible.</p>

            <p>Warm regards,</p>
            <p>School Management Team</p>
        `;

        const emailRecipients = [...EMAIL_RECIPIENTS];

        // Send an email notification about the exception
        for (const address of emailRecipients) {
            await sendEmailToProvidedEmailAddress(address, emailSubject, contactEmailBody(emailDetails));
        }

        await sendEmailToProvidedEmailAddress(email, receiverEmailSubject, receiverHtml);

        return generateResponseData({}, true, STATUS_OK, `Email sent successfully`);
    } catch (error) {
        logger.error(error);

        return error;
    }
}

/**
 * Namespace for services related to contact and email operations.
 * @namespace ContactService
 */
export const ContactService = {
    sendEmailService,
};