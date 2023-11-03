import logger from "../../../shared/logger.js";
import sendEmailToDefaultEmailAddress from "../../../helpers/sendEmailToDefaultEmailAddress.js";
import generateResponseData from "../../../shared/generateResponseData.js";
import {STATUS_OK} from "../../../constants/constants.js";

/**
 * Send email.
 *
 * @async
 * @param emailDetails
 * @returns {Object} - The response after attempting to send email.
 * @throws {Error} Throws an error if any.
 */
const sendEmailService = async (emailDetails) => {
    try {
        const subject = `School Management: ${emailDetails?.subject}`
        const html = `
            <h3>Dear ${emailDetails?.firstName} ${emailDetails?.lastName},</h3>

            <p>We hope this message finds you well. We are reaching out to share some updates from the School Management System.</p>
            
            <h4>🌟 New Message</h4>
            <p>We have received a new message from <strong><u>${emailDetails?.firstName} ${emailDetails?.lastName}</u></strong>:</p>
            <blockquote>
                <p>${emailDetails?.message}</p>
            </blockquote>
            
            <h4>📞 Contact Details</h4>
            <p>If you'd like to get in touch directly, here are ${emailDetails?.firstName}'s contact details:</p>
            <ul>
                <li><strong>Phone:</strong> ${emailDetails?.phone}</li>
                <li><strong>Email:</strong> ${emailDetails?.email}</li>
            </ul>
            
            <br>
            
            <p>Thank you for your attention and have a wonderful day!</p>
            
            <p>Warm regards,</p>
            <p>Your School Management Team</p>
        `;

        await sendEmailToDefaultEmailAddress(subject, html);

        return generateResponseData({}, true, STATUS_OK, `Email sent successfully`);
    } catch (error) {
        logger.error(error);

        throw error;
    }
}

/**
 * @namespace ContactService
 * @description Group of services related to contact operations.
 */
export const ContactService = {
    sendEmailService,
};
