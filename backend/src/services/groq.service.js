const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const getGroqResponse = async (message) => {
    const completion = await groq.chat.completions.create({
        model: "llama-3.1-8b-instant",
        temperature: 0.4,
        max_tokens: 120,
        messages: [
            {
                role: "system",
                content: `
You are InsureGuide, a virtual insurance assistant for rural India.
Keep replies short (3–4 sentences).
Use simple words.
Ask ONE question at the end.
`
            },
            {
                role: "user",
                content: message
            }
        ]
    });

    return completion.choices[0]?.message?.content
        || "Sorry, I did not understand. Can you repeat?";
};

module.exports = { getGroqResponse };
