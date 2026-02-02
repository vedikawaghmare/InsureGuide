const Otp = require("../models/Otp");
const UserProfile = require("../models/UserProfile");
const jwt = require("jsonwebtoken");
const { generateOtp, isValidPhone } = require("../utils/otp");

const generateToken = (phone) => {
    return jwt.sign(
        { phone, userId: `user_${phone}` },
        process.env.JWT_SECRET || "fallback_secret_key",
        { expiresIn: "7d" }
    );
};

// Simulate missed call OTP
exports.requestMissedCallOtp = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!isValidPhone(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
        }

        const otp = generateOtp();

        // Clean expired OTPs for this phone first
        await Otp.deleteMany({ 
            phone, 
            expiresAt: { $lt: new Date() } 
        });

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
    } catch (error) {
        console.error('Missed call OTP error:', error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

exports.verifyOtp = async (req, res) => {
    try {
        const { phone, otp } = req.body;

        if (!isValidPhone(phone) || !otp) {
            return res.status(400).json({ message: "Invalid phone number or OTP" });
        }

        const record = await Otp.findOne({ phone, otp });

        if (!record) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (record.expiresAt < new Date()) {
            // Clean up expired OTP
            await Otp.deleteOne({ _id: record._id });
            return res.status(400).json({ message: "OTP expired" });
        }

        // Clean up all OTPs for this phone after successful verification
        await Otp.deleteMany({ phone });

        const userId = `user_${phone}`;
        
        // Create or update user profile in MongoDB
        let userProfile = await UserProfile.findOne({ userId });
        if (!userProfile) {
            userProfile = await UserProfile.create({
                userId,
                preferences: {
                    language: 'en',
                    location: {},
                    insuranceInterests: [],
                    communicationStyle: 'simple'
                },
                profile: {},
                chatStats: {
                    totalSessions: 0,
                    totalMessages: 0,
                    lastActive: new Date(),
                    commonQuestions: []
                }
            });
        } else {
            // Update last active time
            userProfile.chatStats.lastActive = new Date();
            await userProfile.save();
        }

        // Generate JWT token
        const token = generateToken(phone);

        res.json({ 
            message: "Login successful", 
            token,
            user: { phone, userId, profile: userProfile }
        });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};

// 📩 SMS OTP (MVP)
exports.requestSmsOtp = async (req, res) => {
    try {
        const { phone } = req.body;

        if (!isValidPhone(phone)) {
            return res.status(400).json({ message: "Invalid phone number. Must be 10 digits." });
        }

        const otp = generateOtp();

        // Clean expired OTPs for this phone first
        await Otp.deleteMany({ 
            phone, 
            expiresAt: { $lt: new Date() } 
        });

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
    } catch (error) {
        console.error('SMS OTP error:', error);
        res.status(500).json({ message: "Server error. Please try again." });
    }
};
