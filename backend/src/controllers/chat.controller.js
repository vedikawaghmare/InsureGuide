const { getGroqResponse } = require("../services/groq.service");
const { getOllamaResponse, checkOllamaStatus } = require("../services/ollama.service");
const chatService = require('../services/chat.service');

exports.chatWithAgent = async (req, res) => {
    try {
        const { message, userId = 'anonymous', sessionId } = req.body;

        if (!message) {
            return res.json({ response: "Please say something." });
        }

        const currentSessionId = sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        const result = await chatService.getChatResponse(userId, message, currentSessionId);
        
        res.json({
            response: result.response,
            source: result.source,
            sessionId: result.sessionId
        });

    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({
            response: "Agent is busy. Please try again."
        });
    }
};

