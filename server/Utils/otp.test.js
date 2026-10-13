const test = require("node:test");
const assert = require("node:assert/strict");
process.env.OTP_HASH_SECRET = "test-only-secret-with-enough-entropy";
const { generateOtp, hashOtp, isOtpMatch, OTP_TTL_MS, OTP_MAX_ATTEMPTS } = require("./otp");

test("generates a six digit numeric OTP", () => {
    const otp = generateOtp();
    assert.match(otp, /^\d{6}$/);
});

test("hashes OTPs with email and purpose binding", () => {
    const digest = hashOtp("person@example.com", "signup", "123456");
    assert.equal(isOtpMatch(digest, hashOtp("person@example.com", "signup", "123456")), true);
    assert.equal(isOtpMatch(digest, hashOtp("other@example.com", "signup", "123456")), false);
    assert.equal(isOtpMatch(digest, hashOtp("person@example.com", "password-reset", "123456")), false);
    assert.equal(isOtpMatch(digest, hashOtp("person@example.com", "signup", "654321")), false);
    assert.equal(isOtpMatch("123456", digest), false);
});

test("uses bounded expiry and verification attempts", () => {
    assert.equal(OTP_TTL_MS, 5 * 60 * 1000);
    assert.equal(OTP_MAX_ATTEMPTS, 5);
});
