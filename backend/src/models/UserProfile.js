const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    preferences: {
        language: { type: String, default: 'en' },
        location: {
            district: String,
            state: String,
            coordinates: {
                lat: Number,
                lon: Number
            }
        },
        insuranceInterests: [String],
        communicationStyle: { type: String, enum: ['simple', 'detailed'], default: 'simple' }
    },
    profile: {
        age: Number,
        occupation: String,
        income: String,
        familySize: Number
    },
    chatStats: {
        totalSessions: { type: Number, default: 0 },
        totalMessages: { type: Number, default: 0 },
        lastActive: { type: Date, default: Date.now },
        commonQuestions: [String]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('UserProfile', userProfileSchema);