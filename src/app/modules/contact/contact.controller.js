import { ContactService } from "./contact.service.js";

const contactController = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            subject,
            message,
        } = req?.body;
        const contactDetails = {
            firstName,
            lastName,
            phone,
            email,
            subject,
            message,
        };
        const contactServiceResponse = ContactService.contactService(req?.db, contactDetails);
        const returnData = {
            data: contactServiceResponse?.data,
            success: contactServiceResponse?.success,
            status: contactServiceResponse?.status,
            message: contactServiceResponse?.message,
        };

        return res.status(contactServiceResponse?.status).json(returnData);
    } catch (error) {
        res.status(500).json(error);
    }
};

/**
 * @module ContactController - Controller for contact-related operations.
 */
export const ContactController = {
    contactController,
};
