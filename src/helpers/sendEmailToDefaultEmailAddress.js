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
 * Sends an email to the default email address configured in the system.
 *
 * @async
 * @function
 * @param {string} subject - The subject of the email.
 * @param {string} html - The HTML content of the email.
 * @throws {Error} Throws an error if there is an issue with sending the email.
 * @returns {Promise<void>} Returns a promise that resolves when the email is sent successfully.
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