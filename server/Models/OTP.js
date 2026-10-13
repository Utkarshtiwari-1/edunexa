const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true, lowercase: true, trim: true },
    purpose: { type: String, required: true, enum: ["signup"], default: "signup" },
    otpHash: { type: String },
    otpExpiresAt: { type: Date },
    purgeAt: { type: Date },
    attempts: { type: Number, default: 0 },
    consumedAt: { type: Date, default: null },
    lastSentAt: { type: Date },
    pendingHash: { type: String },
    pendingToken: { type: String },
}, { timestamps: true });

otpSchema.index(
    { email: 1, purpose: 1 },
    { unique: true, partialFilterExpression: { purpose: { $type: "string" } } }
);
otpSchema.index({ purgeAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("OTP", otpSchema);
