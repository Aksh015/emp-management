const { google } = require('googleapis');
require('dotenv').config();

const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
    try {
        const oauth2Client = new OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        );

        oauth2Client.setCredentials({
            refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });

        const accessToken = await new Promise((resolve, reject) => {
            oauth2Client.getAccessToken((err, token) => {
                if (err) {
                    console.error('Failed to create access token:', err);
                    reject(err);
                }
                resolve(token);
            });
        });

        return { oauth2Client, accessToken };
    } catch (err) {
        console.error('Error creating transporter:', err);
        return null;
    }
};

const makeBody = (to, from, subject, message) => {
    const str = [
        `To: ${to}`,
        `From: ${from}`,
        `Subject: ${subject}`,
        `MIME-Version: 1.0`,
        `Content-Type: text/html; charset=UTF-8`,
        ``,
        message
    ].join('\n');

    return Buffer.from(str)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
};

async function sendEmail(to, subject, text, html) {
    try {
        const { oauth2Client } = await createTransporter();
        const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

        const from = `Dayflow HR <${process.env.EMAIL_USER}>`;
        const body = html || text.replace(/\n/g, '<br>');
        const raw = makeBody(to, from, subject, body);

        console.log(`Attempting to send email via Gmail API to: ${to}`);

        const result = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: raw,
            },
        });

        console.log(`Email sent successfully to ${to}. Message ID: ${result.data.id}`);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

async function sendCredentials(email, loginId, password, name, companyName) {
    const subject = `Welcome to ${companyName} - Your Login Credentials`;
    const text = `Dear ${name},

Welcome to ${companyName}! Your account has been created.

Here are your login credentials:
Login ID: ${loginId}
Password: ${password}

Please request a password change upon your first login.

Best regards,
${companyName} HR Team`;

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Welcome to ${companyName}!</h2>
            <p>Dear ${name},</p>
            <p>Your account has been created successfully.</p>
            <div style="background-color: #f4f4f4; padding: 20px; border-radius: 5px; margin: 20px 0;">
                <h3>Your Login Credentials:</h3>
                <p><strong>Login ID:</strong> ${loginId}</p>
                <p><strong>Password:</strong> ${password}</p>
            </div>
            <p>Please request a password change upon your first login.</p>
            <br>
            <p>Best regards,</p>
            <p>${companyName} HR Team</p>
        </div>
    `;

    return sendEmail(email, subject, text, html);
}

module.exports = { sendEmail, sendCredentials };
