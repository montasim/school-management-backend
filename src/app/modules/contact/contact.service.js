import nodemailer from "nodemailer";
import { StatusCodes } from "http-status-codes";

const contactService = async (db,  contactDetails) => {
    try {
        const {
            firstName,
            lastName,
            phone,
            email,
            subject,
            message,
        } = contactDetails;

        // Create a nodemailer transporter with your email service details
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com", // Your email address
      pass: "your-email-password", // Your email password
    },
  });

  // Email data
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "destination-email@example.com", // Replace with the destination email address
    subject: subject,
    text: `
      Name: ${firstName} ${lastName}
      Phone: ${phone}
      Email: ${email}
      Message: ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return {
            data: {},
            success: false,
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "Error sending email"
        };
    } else {
        return {
            data: info?.response,
            success: true,
            status: StatusCodes.OK,
            message: "Email sent successfully"
        };
    }
  });
});
    } catch (error) {
        throw error;
    }
};

export const ContactService = {
    contactService,
};
