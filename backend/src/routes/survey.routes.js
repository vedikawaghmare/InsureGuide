const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const {
    createSurvey,
    getAllSurveys,
} = require("../controllers/survey.controller");

// POST: save survey
router.post("/", authMiddleware, createSurvey);

// GET: fetch all surveys
router.get("/", getAllSurveys);

// test route
router.get("/test", (req, res) => {
    res.json({ message: "Survey route working ✅" });
});

module.exports = router;
