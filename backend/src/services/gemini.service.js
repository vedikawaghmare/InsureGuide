const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getGeminiResponse(userMessage) {
    const model = genAI.getGenerativeModel({
        model: "gemini-pro"
    });

    const prompt = `
You are InsureGuide, a virtual insurance assistant for rural India.
Explain things in very simple language.
Avoid financial jargon.
If needed, give step-by-step guidance.

User says: "${userMessage}"
`;

    const result = await model.generateContent(prompt);
    return result.response.text();
}

module.exports = { getGeminiResponse };
