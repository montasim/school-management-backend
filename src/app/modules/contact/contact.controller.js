import { ContactService } from "./contact.service.js";
import extractFromRequest from "../../../helpers/extractFromRequest.js";
import handleServiceResponse from "../../../helpers/handleServiceResponse.js";

/**
 * @async
 * @function sendEmailController
 * @description Controller for creating a new sendEmail.
 *
 * @param {express.Request} req - Express request object containing sendEmail details.
 * @param {express.Response} res - Express response object to send data back to client.
 */
const sendEmailController = async (req, res) => {
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
};

/**
 * @namespace ContactController
 * @description Group of controllers for handling sendEmail operations.
 */
export const ContactController = {
    sendEmailController,
};
