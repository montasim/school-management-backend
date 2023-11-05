import logger from "../../../shared/logger.js";
import sendEmailToDefaultEmailAddress from "../../../helpers/sendEmailToDefaultEmailAddress.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import { EMAIL_SERVICE_DESTINATION_OWNER_NAME, EMAIL_SERVICE_DESTINATION_EMAIL } from "../../../config/config.js";
import { STATUS_OK } from "../../../constants/constants.js";

/**
 * Send email.
 *
 * @async
 * @param emailDetails
 * @returns {Object} - The response after attempting to send email.
 * @throws {Error} Throws an error if any.
 */
const sendEmailService = async ( emailDetails ) => {
    try {
        const {firstName, lastName, phone, email, subject, message } = emailDetails;
        const emailSubject = `School Management: ${subject}`
        const html = `
            <h3>Dear ${EMAIL_SERVICE_DESTINATION_OWNER_NAME},</h3>

            <p>We hope this message finds you well. We are reaching out to share some updates from the School Management System.</p>
            
            <h4>🌟 New Message</h4>
            <p>We have received a new message from <strong><u>${firstName} ${lastName}</u></strong>:</p>
            <blockquote>
                <p>${message}</p>
            </blockquote>
            
            <h4>📬 Contact Details:</h4>
            <p>If you'd like to get in touch directly, here are ${firstName}'s contact details:</p>
            <ul>
                <li><strong>Phone:</strong> ${phone}</li>
                <li><strong>Email:</strong> ${email}</li>
            </ul>
            
            <p>Thank you for your attention and have a wonderful day!</p>

            <p>Warm regards,</p>
            <p>Your School Management Team</p>
        `;

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

        await sendEmailToDefaultEmailAddress(EMAIL_SERVICE_DESTINATION_EMAIL, emailSubject, html);
        await sendEmailToDefaultEmailAddress(email, receiverEmailSubject, receiverHtml);

        return generateResponseData({}, true, STATUS_OK, `Email sent successfully`);
    } catch (error) {
        logger.error(error);

        return error;
    }
}

/**
 * @namespace ContactService
 * @description Group of services related to contact operations.
 */
export const ContactService = {
    sendEmailService,
};
