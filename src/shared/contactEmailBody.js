function contactEmailBody(emailDetails = {}) {
    const { firstName, lastName, message, phone, email } = emailDetails;

    return `
        <h3>Dear Admin,</h3>

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
}

export default contactEmailBody;