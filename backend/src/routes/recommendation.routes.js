const express = require("express");
const router = express.Router();

const {
  getRecommendationForSurvey,
} = require("../controllers/recommendation.controller");

router.get("/:surveyId", getRecommendationForSurvey);

module.exports = router;
