const sgMail = require('@sendgrid/mail');
require('dotenv').config();

// Initialize SendGrid with API key
if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

async function sendEmail(to, subject, text) {
    try {
        // Fallback to console logging if SendGrid is not configured
        if (!process.env.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY === 'your_sendgrid_api_key') {
            console.log('================================================================');
            console.log(`[MOCK EMAIL SERVICE] (Configure SENDGRID_API_KEY to send real emails)`);
            console.log(`TO: ${to}`);
            console.log(`SUBJECT: ${subject}`);
            console.log(`BODY:`);
            console.log(text);
            console.log('================================================================');
            return { success: true, messageId: 'mock-message-id' };
        }

        const msg = {
            to: to,
            from: process.env.SENDGRID_FROM_EMAIL || process.env.SMTP_USER,
            subject: subject,
            text: text,
        };

        console.log(`Attempting to send email to ${to} via SendGrid`);

        const response = await sgMail.send(msg);

        console.log('Message sent via SendGrid:', response[0].statusCode);
        return { success: true, messageId: response[0].headers['x-message-id'] };
    } catch (error) {
        console.error('Error sending email via SendGrid:', error);
        if (error.response) {
            console.error('SendGrid error body:', error.response.body);
        }
        return { success: false, error: error.toString() };
    }
}

async function sendCredentials(email, loginId, password, name, companyName) {
    const subject = `Welcome to ${companyName} - Your Login Credentials`;
    const body = `Dear ${name},

Welcome to ${companyName}! Your account has been created.

Here are your login credentials:
Login ID: ${loginId}
Password: ${password}

Please request a password change upon your first login.

Best regards,
${companyName} HR Team`;

    return sendEmail(email, subject, body);
}

module.exports = { sendEmail, sendCredentials };
