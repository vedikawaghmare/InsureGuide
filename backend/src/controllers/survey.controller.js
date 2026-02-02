const Survey = require("../models/Survey.model");

// POST /api/survey
exports.createSurvey = async (req, res) => {
    try {
        const survey = new Survey(req.body);
        await survey.save();

        res.status(201).json({
            message: "Survey saved successfully ",
            data: survey,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error saving survey ",
            error: error.message,
        });
    }
};

// GET /api/survey
exports.getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find().sort({ createdAt: -1 });

    res.status(200).json({
      message: "Surveys fetched successfully",
      count: surveys.length,
      data: surveys,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching surveys",
      error: error.message,
    });
  }
};
