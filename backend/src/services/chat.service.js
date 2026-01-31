const ChatSession = require('../models/ChatSession');
const UserProfile = require('../models/UserProfile');
const KnowledgeBase = require('../models/KnowledgeBase');
const { getGroqResponse } = require('./groq.service');
const { getOllamaResponse, checkOllamaStatus } = require('./ollama.service');

class ChatService {
    async getChatResponse(userId, message, sessionId) {
        try {
            // Use upsert to ensure session is always saved
            let session = await ChatSession.findOneAndUpdate(
                { sessionId },
                { 
                    $setOnInsert: { 
                        userId, 
                        sessionId,
                        messages: [],
                        createdAt: new Date()
                    }
                },
                { upsert: true, new: true }
            );

            const isNewSession = session.messages.length === 0;

            // Add user message
            session.messages.push({
                role: 'user',
                content: message,
                timestamp: new Date()
            });

            // Get context from previous messages
            const context = this.buildContext(session.messages);
            
            let response, source;

            try {
                // Try online first
                response = await getGroqResponse(message, context);
                source = 'online';
            } catch (groqError) {
                try {
                    // Try Ollama
                    const isOllamaAvailable = await checkOllamaStatus();
                    if (isOllamaAvailable) {
                        response = await getOllamaResponse(message, context);
                        source = 'offline';
                    } else {
                        // Fallback to knowledge base
                        response = await this.getKnowledgeBaseResponse(message);
                        source = 'fallback';
                    }
                } catch (ollamaError) {
                    response = await this.getKnowledgeBaseResponse(message);
                    source = 'fallback';
                }
            }

            // Add assistant response
            session.messages.push({
                role: 'assistant',
                content: response,
                timestamp: new Date(),
                source
            });

            // Save session with messages
            await session.save();

            // Update user stats (only for new sessions)
            await this.updateUserStats(userId, message, isNewSession);

            return { response, source, sessionId };

        } catch (error) {
            console.error('Chat Service Error:', error);
            return { 
                response: "I'm having trouble right now. Please try again.", 
                source: 'error',
                sessionId,
                errorCode: 'CHAT_SERVICE_ERROR'
            };
        }
    }

    buildContext(messages) {
        // Get last 5 messages for context (future: use embeddings for long-term context)
        const recentMessages = messages.slice(-5);
        return recentMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n');
    }

    async getKnowledgeBaseResponse(message) {
        try {
            // Use indexed search for better performance
            const knowledge = await KnowledgeBase.findOne({
                $text: { $search: message }
            }, {
                score: { $meta: "textScore" }
            }).sort({
                score: { $meta: "textScore" },
                priority: -1
            }).limit(1);

            if (knowledge) {
                return knowledge.answer;
            }

            // Fallback to keyword matching if text search fails
            const keywords = message.toLowerCase().split(' ').filter(word => word.length > 2);
            const keywordMatch = await KnowledgeBase.findOne({
                keywords: { $in: keywords },
                isActive: true
            }).sort({ priority: -1 });

            return keywordMatch ? keywordMatch.answer : "I don't have information about that right now. Please try asking differently.";
        } catch (error) {
            return "I'm having trouble accessing my knowledge base. Please try again.";
        }
    }

    async updateUserStats(userId, message, isNewSession) {
        try {
            const updateData = {
                $set: { 'chatStats.lastActive': new Date() },
                $addToSet: { 'chatStats.commonQuestions': message.substring(0, 50) },
                $inc: { 'chatStats.totalMessages': 1 }
            };

            // Only increment session count for new sessions
            if (isNewSession) {
                updateData.$inc['chatStats.totalSessions'] = 1;
            }

            await UserProfile.findOneAndUpdate(
                { userId },
                updateData,
                { upsert: true }
            );
        } catch (error) {
            console.error('User stats update error:', error);
        }
    }

    async getChatHistory(sessionId, limit = 20) {
        try {
            const session = await ChatSession.findOne({ sessionId });
            if (!session) return [];
            
            return session.messages.slice(-limit);
        } catch (error) {
            console.error('Chat history error:', error);
            return [];
        }
    }
}

module.exports = new ChatService();