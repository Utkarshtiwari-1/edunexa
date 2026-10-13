const test = require("node:test");
const assert = require("node:assert/strict");

process.env.BREVO_API_KEY = "test-api-key";
process.env.EMAIL_FROM = "Edunexa <verified@example.com>";
const mailsender = require("./mailsender");

test("submits OTP mail through the Brevo HTTPS API", async () => {
    const originalFetch = global.fetch;
    let request;
    global.fetch = async (url, options) => {
        request = { url, options };
        return { ok: true, json: async () => ({ messageId: "test-message-id" }) };
    };
    try {
        const result = await mailsender("user@example.com", "Verify", "<p>code</p>");
        assert.equal(request.url, "https://api.brevo.com/v3/smtp/email");
        assert.equal(request.options.headers["api-key"], "test-api-key");
        assert.deepEqual(JSON.parse(request.options.body), {
            sender: { name: "Edunexa", email: "verified@example.com" },
            to: [{ email: "user@example.com" }],
            subject: "Verify",
            htmlContent: "<p>code</p>",
        });
        assert.equal(result.messageId, "test-message-id");
    } finally {
        global.fetch = originalFetch;
    }
});

test("does not expose provider response details", async () => {
    const originalFetch = global.fetch;
    global.fetch = async () => ({ ok: false, status: 401, json: async () => ({ message: "secret provider detail" }) });
    try {
        await assert.rejects(mailsender("user@example.com", "Verify", "<p>code</p>"), {
            message: "Email submission failed",
        });
    } finally {
        global.fetch = originalFetch;
    }
});

test("fails safely on network errors", async () => {
    const originalFetch = global.fetch;
    global.fetch = async () => { throw new Error("private network detail"); };
    try {
        await assert.rejects(mailsender("user@example.com", "Verify", "<p>code</p>"), {
            message: "Email submission failed",
        });
    } finally {
        global.fetch = originalFetch;
    }
});
