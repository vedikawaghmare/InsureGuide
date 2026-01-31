const mongoose = require('mongoose');

const knowledgeBaseSchema = new mongoose.Schema({
    question: { type: String, required: true },
    keywords: [String],
    answer: { type: String, required: true },
    category: { type: String, enum: ['insurance', 'claims', 'policies', 'general'], required: true },
    language: { type: String, default: 'en' },
    priority: { type: Number, default: 1 },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

knowledgeBaseSchema.index({ keywords: 'text', question: 'text' });

module.exports = mongoose.model('KnowledgeBase', knowledgeBaseSchema);