import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import generateResponse from "../../../helpers/generateResponse.js";
import logger from "../../middlewares/logger.js";
import {
    EMAIL_SERVICE,
    EMAIL_SERVICE_DESTINATION_EMAIL,
    EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_USER
} from "../../../config/config.js";

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
        // Create a nodemailer transporter with your email service details
        const config = nodemailer.createTransport({
            service : EMAIL_SERVICE,
            auth: {
                user: EMAIL_SERVICE_USER,
                pass: EMAIL_SERVICE_PASSWORD,
            },
        });
        const transporter = nodemailer.createTransport(config);
        const MailGenerator = new Mailgen({
            theme: "default",
            product : {
                name: "Mailgen",
                link : 'https://mailgen.js/'
            }
        });
        const response = {
            body: {
                name : "Daily Tuition",
                intro: "Your bill has arrived!",
                table : {
                    data : [
                        {
                            item : "Nodemailer Stack Book",
                            description: "A Backend application",
                            price : "$10.99",
                        }
                    ]
                },
                outro: "Looking forward to do more business"
            }
        }
        const mail = MailGenerator.generate(response)
        const message = {
            from : EMAIL_SERVICE_USER,
            to : EMAIL_SERVICE_DESTINATION_EMAIL,
            subject: emailDetails?.subject,
            html: mail
        }

        transporter?.sendMail(message).then(() => {
            return generateResponse({}, true, 200, 'you should receive an email');
        }).catch((error) => {
            return generateResponse(error, false, 500, 'Failed to send email. Please try again');
        })
    } catch (error) {
        logger.error(error);

        throw error;
    }
};

/**
 * @namespace ContactService
 * @description Group of services related to contact operations.
 */
export const ContactService = {
    sendEmailService,
};
