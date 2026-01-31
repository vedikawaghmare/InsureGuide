const { getGroqResponse } = require("../services/groq.service");

exports.chatWithAgent = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.json({ response: "Please say something." });
        }

        const reply = await getGroqResponse(message);
        res.json({ response: reply });

    } catch (error) {
        console.error("Groq Error:", error);
        res.status(500).json({
            response: "Agent is busy. Please try again."
        });
    }
};
