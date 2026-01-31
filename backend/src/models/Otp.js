const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    purpose: {
        type: String
    },
    expiresAt: {
        type: Date
    }
});

module.exports = mongoose.model("Otp", otpSchema);
