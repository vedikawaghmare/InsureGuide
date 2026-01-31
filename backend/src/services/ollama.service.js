const axios = require("axios");

const OLLAMA_URL = "http://localhost:11434";

const getOllamaResponse = async (message, context = '') => {
    try {
        const contextPrompt = context ? `Previous conversation:\n${context}\n\n` : '';
        
        const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
            model: "llama3.2:1b",
            prompt: `You are InsureGuide, a virtual insurance assistant for rural India.
Keep replies short (3-4 sentences).
Use simple words.
Ask ONE question at the end.
${contextPrompt ? 'Use the conversation context to provide relevant responses.' : ''}

${contextPrompt}User: ${message}
Assistant:`,
            stream: false,
            options: {
                temperature: 0.4,
                num_predict: 120
            }
        }, {
            timeout: 10000
        });

        return response.data.response || "Sorry, I did not understand. Can you repeat?";
    } catch (error) {
        console.error("Ollama Error:", error.message);
        throw new Error("Ollama service unavailable");
    }
};

const checkOllamaStatus = async () => {
    try {
        await axios.get(`${OLLAMA_URL}/api/tags`, { timeout: 3000 });
        return true;
    } catch {
        return false;
    }
};

module.exports = { getOllamaResponse, checkOllamaStatus };