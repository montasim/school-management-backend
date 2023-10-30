import nodemailer from "nodemailer";

const contactService = async (db,  contactDetails) => {
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
            status: 500,
            message: "Error sending email"
        };
    } else {
        return {
            data: info?.response,
            success: true,
            status: 200,
            message: "Email sent successfully"
        };
    }
  });
};

export const ContactService = {
    contactService,
};