const mongoose = require('mongoose');

const chatSessionSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    sessionId: { type: String, required: true, unique: true },
    messages: [{
        role: { type: String, enum: ['user', 'assistant'], required: true },
        content: { type: String, required: true },
        timestamp: { type: Date, default: Date.now },
        source: { type: String, enum: ['online', 'offline', 'fallback'], default: 'online' }
    }],
    language: { type: String, default: 'en' },
    userContext: {
        location: String,
        interests: [String],
        lastActivity: { type: Date, default: Date.now }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);