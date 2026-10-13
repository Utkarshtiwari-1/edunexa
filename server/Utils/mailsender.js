require("dotenv").config();

const BREVO_SEND_URL = "https://api.brevo.com/v3/smtp/email";

const parseSender = (value) => {
    const formatted = value.match(/^\s*(.*?)\s*<([^<>]+)>\s*$/);
    const email = (formatted ? formatted[2] : value).trim();
    const name = formatted?.[1]?.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Email sender is not configured correctly");
    }
    return { email, ...(name ? { name } : {}) };
};

const mailsender = async (email, title, html) => {
    const apiKey = process.env.BREVO_API_KEY;
    const sender = process.env.EMAIL_FROM;
    if (!apiKey || !sender) {
        throw new Error("Email service is not configured");
    }

    let response;
    try {
        response = await fetch(BREVO_SEND_URL, {
            method: "POST",
            headers: {
                accept: "application/json",
                "api-key": apiKey,
                "content-type": "application/json",
            },
            body: JSON.stringify({
                sender: parseSender(sender),
                to: [{ email }],
                subject: title,
                htmlContent: html,
            }),
            signal: AbortSignal.timeout(10000),
        });
    } catch (_) {
        throw new Error("Email submission failed");
    }

    if (!response.ok) {
        throw new Error("Email submission failed");
    }

    try {
        return await response.json();
    } catch (_) {
        return {};
    }
};

module.exports = mailsender;
