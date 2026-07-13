const nodemailer = require("nodemailer");
require("dotenv").config();

const mailsender = async (email, title, html) => {
    if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
        throw new Error("Email service is not configured");
    }

    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: Number(process.env.MAIL_PORT || 587),
        secure: process.env.MAIL_SECURE === "true",
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
        // Do not leave the signup request hanging for Nodemailer's default timeout.
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
    });

    return transporter.sendMail({
        from: process.env.MAIL_FROM || `StudyNotion <${process.env.MAIL_USER}>`,
        to: email,
        subject: title,
        html,
    });
};

module.exports = mailsender;
