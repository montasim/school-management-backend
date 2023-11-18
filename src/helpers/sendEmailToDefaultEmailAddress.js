/**
 * @fileoverview Email Sending Service
 *
 * This service module provides functionality to send emails using nodemailer. It is configured to use specific email service
 * settings defined in the system's environment variables. The service includes a function for sending emails to a default or specified
 * email address, with the flexibility to set the subject and HTML content of the email. The module imports the required configuration
 * from "../config/config.js" and uses a logger from "../shared/logger.js" for logging purposes.
 *
 * @module EmailSendingService
 */

import nodemailer from "nodemailer";
import logger from "../shared/logger.js";
import {
    EMAIL_SERVICE,
    EMAIL_SERVICE_DESTINATION_EMAIL,
    EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_USER
} from "../config/config.js";

/**
 * Sends an email to the specified or default email address.
 *
 * This asynchronous function uses nodemailer to create a transporter object configured with the system's email service settings.
 * It sends an email to either a specified address or a default destination email address, with the given subject and HTML content.
 * The function handles errors by logging them and returning the error object. It is useful for automated email notifications
 * or alerts within the system.
 *
 * @async
 * @param {string} [emailAddress=EMAIL_SERVICE_DESTINATION_EMAIL] - The recipient's email address. Defaults to the system's configured destination email.
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @throws {Error} - Throws an error if there is an issue with sending the email.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
const sendEmailToDefaultEmailAddress = async (emailAddress = EMAIL_SERVICE_DESTINATION_EMAIL, subject, html) => {
    try {
        // Create a transporter object using the configuration from environment variables
        const transporter = nodemailer.createTransport({
            host: EMAIL_SERVICE,
            port: EMAIL_SERVICE_PORT,
            secure: false, // Use TLS. When false, connection will use upgraded TLS (if available) via STARTTLS command.
            auth: {
                user: EMAIL_SERVICE_USER, // Email sender's address
                pass: EMAIL_SERVICE_PASSWORD // Email sender's password
            }
        });

        // Send the email using the transporter
        return await transporter.sendMail({
            from: EMAIL_SERVICE_USER, // Sender's email address
            to: emailAddress, // Receiver's email address
            subject: subject, // Subject of the email
            html: html, // HTML content of the email
        });
    } catch (error) {
        logger.error(error);

        return error;
    }
}

export default sendEmailToDefaultEmailAddress;