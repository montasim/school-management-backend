import nodemailer from "nodemailer";
import logger from "../shared/logger.js";
import {
    EMAIL_SERVICE,
    EMAIL_SERVICE_DESTINATION_EMAIL,
    EMAIL_SERVICE_PASSWORD,
    EMAIL_SERVICE_PORT,
    EMAIL_SERVICE_USER
} from "../config/config.js";

const sendEmailToDefaultEmailAddress = async (subject, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: EMAIL_SERVICE,
            port: EMAIL_SERVICE_PORT,
            secure: false,
            auth: {
                user: EMAIL_SERVICE_USER,
                pass: EMAIL_SERVICE_PASSWORD
            }
        });

        await transporter.sendMail({
            from: EMAIL_SERVICE_USER,
            to: EMAIL_SERVICE_DESTINATION_EMAIL,
            subject: subject,
            html: html,
        });
    } catch (error) {
        logger.error(error);

        throw error;
    }
}

export default sendEmailToDefaultEmailAddress;