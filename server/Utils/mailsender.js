const { Resend } = require("resend");
require("dotenv").config();

let resendClient;

const getResend = () => {
    if (!process.env.RESEND_API_KEY) {
        throw new Error("Email service is not configured");
    }
    if (!resendClient) resendClient = new Resend(process.env.RESEND_API_KEY);
    return resendClient;
};

const mailsender = async (email, title, html) => {
    if (!process.env.EMAIL_FROM) {
        throw new Error("Email sender is not configured");
    }

    const { data, error } = await getResend().emails.send({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: title,
        html,
    });
    if (error) throw new Error("Email submission failed");
    return data;
};

module.exports = mailsender;
