const KnowledgeBase = require('../models/KnowledgeBase');

const seedKnowledgeBase = async () => {
    try {
        const knowledgeData = [
            {
                question: "What is insurance?",
                keywords: ["insurance", "what", "meaning", "definition"],
                answer: "Insurance is protection for your family and property. You pay small money regularly, and if something bad happens, insurance company gives you big money to help.",
                category: "insurance",
                language: "en",
                priority: 5
            },
            {
                question: "How to file a claim?",
                keywords: ["claim", "file", "submit", "how"],
                answer: "To file a claim: 1) Take photos of damage 2) Call insurance company immediately 3) Fill claim form 4) Submit all documents. We can help you do this step by step.",
                category: "claims",
                language: "en",
                priority: 5
            },
            {
                question: "What documents needed for claim?",
                keywords: ["documents", "papers", "claim", "needed"],
                answer: "For claim you need: Policy copy, ID proof, photos of damage, police report (if theft), medical bills (if health). Keep all original papers safe.",
                category: "claims",
                language: "en",
                priority: 4
            },
            {
                question: "How much premium to pay?",
                keywords: ["premium", "cost", "price", "pay"],
                answer: "Premium depends on your age, income, and what you want to protect. Start with small amount like ₹500-1000 per month. We can suggest best plan for you.",
                category: "policies",
                language: "en",
                priority: 4
            },
            {
                question: "Which insurance is best?",
                keywords: ["best", "which", "good", "recommend"],
                answer: "Best insurance depends on your needs. For family: Health insurance first, then life insurance. For farmers: Crop insurance. Tell me about your family and I'll suggest.",
                category: "insurance",
                language: "en",
                priority: 4
            },
            {
                question: "What is health insurance?",
                keywords: ["health", "medical", "hospital"],
                answer: "Health insurance pays for hospital bills when you or family get sick. Very important because hospital costs are very high. Government also has free schemes.",
                category: "insurance",
                language: "en",
                priority: 4
            },
            {
                question: "What is life insurance?",
                keywords: ["life", "death", "family"],
                answer: "Life insurance gives money to your family if something happens to you. It protects your children's future and pays for house loan, education costs.",
                category: "insurance",
                language: "en",
                priority: 4
            },
            {
                question: "How to check claim status?",
                keywords: ["status", "check", "claim", "track"],
                answer: "You can check claim status by: 1) Calling insurance company 2) Using their website 3) SMS to their number 4) Visiting office. Keep your claim number ready.",
                category: "claims",
                language: "en",
                priority: 3
            }
        ];

        // Clear existing data
        await KnowledgeBase.deleteMany({});
        
        // Insert new data
        await KnowledgeBase.insertMany(knowledgeData);
        
        console.log('Knowledge base seeded successfully');
    } catch (error) {
        console.error('Knowledge base seeding error:', error);
    }
};

module.exports = { seedKnowledgeBase };