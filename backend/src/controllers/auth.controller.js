const Otp = require("../models/Otp");

const generateOtp = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

// Simulate missed call OTP
exports.requestMissedCallOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    const otp = generateOtp();

    await Otp.create({
        phone,
        otp,
        purpose: "missed_call",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    console.log(`📞 MISSED CALL OTP for ${phone}: ${otp}`);

    res.json({
        message: "Missed call received. You will get a callback shortly.",
        demoOtp: otp // ⚠️ demo only
    });
};

exports.verifyOtp = async (req, res) => {
    const { phone, otp } = req.body;

    const record = await Otp.findOne({ phone, otp });

    if (!record) {
        return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < new Date()) {
        return res.status(400).json({ message: "OTP expired" });
    }

    await Otp.deleteMany({ phone });

    res.json({ message: "Login successful" });
};

// 📩 SMS OTP (MVP)
exports.requestSmsOtp = async (req, res) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        return res.status(400).json({ message: "Invalid phone number" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({
        phone,
        otp,
        purpose: "sms",
        expiresAt: new Date(Date.now() + 5 * 60 * 1000)
    });

    console.log(`💬 SMS OTP for ${phone}: ${otp}`);

    res.json({
        message: "OTP sent via SMS",
        demo: true
    });
};
