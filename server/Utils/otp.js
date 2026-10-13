const crypto = require("crypto");

const OTP_TTL_MS = 5 * 60 * 1000;
const OTP_RESEND_INTERVAL_MS = 60 * 1000;
const OTP_MAX_ATTEMPTS = 5;
const OTP_PURPOSE = "signup";

const generateOtp = () => String(crypto.randomInt(100000, 1000000));

const hashOtp = (email, purpose, otp) => crypto
    .createHmac("sha256", process.env.OTP_HASH_SECRET || process.env.JWT_SECRET)
    .update(`${email}:${purpose}:${otp}`)
    .digest("hex");

const isOtpMatch = (storedHash, suppliedHash) => {
    if (!storedHash || !/^[a-f0-9]{64}$/i.test(storedHash)) return false;
    return crypto.timingSafeEqual(Buffer.from(storedHash, "hex"), Buffer.from(suppliedHash, "hex"));
};

module.exports = {
    OTP_TTL_MS,
    OTP_RESEND_INTERVAL_MS,
    OTP_MAX_ATTEMPTS,
    OTP_PURPOSE,
    generateOtp,
    hashOtp,
    isOtpMatch,
};
