const Survey = require("../models/Survey.model");
const { getRecommendations } = require("../services/recommendation.service");

// GET /api/recommendation/:surveyId
exports.getRecommendationForSurvey = async (req, res) => {
    try {
        const survey = await Survey.findById(req.params.surveyId);

        if (!survey) {
            return res.status(404).json({ message: "Survey not found" });
        }

        const recommendations = getRecommendations(survey);

        res.status(200).json({
            message: "Insurance recommendations generated ✅",
            surveyId: survey._id,
            recommendations,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error generating recommendations",
            error: error.message,
        });
    }
};
