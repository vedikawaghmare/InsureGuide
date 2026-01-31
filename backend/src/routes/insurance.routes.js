const express = require("express");
const router = express.Router();

const {
    getInsuranceRecommendations,
    getAvailablePlans
} = require("../controllers/insurance.controller");

// GET: Get insurance recommendations for location
router.get("/recommendations", getInsuranceRecommendations);

// GET: Get all available insurance plans
router.get("/plans", getAvailablePlans);

// Test route
router.get("/test", (req, res) => {
    res.json({ message: "Insurance routes working ✅" });
});

module.exports = router;