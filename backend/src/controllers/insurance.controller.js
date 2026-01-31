const insuranceService = require("../services/insurance.service");

exports.getInsuranceRecommendations = async (req, res) => {
    try {
        const { lat, lon, district } = req.query;

        // Validate required parameters
        if (!lat || !lon) {
            return res.status(400).json({
                error: "Missing required parameters",
                message: "Please provide lat and lon coordinates"
            });
        }

        // Get insurance recommendations
        const recommendations = await insuranceService.getLocationBasedRecommendations(
            lat, 
            lon, 
            district || "Unknown"
        );

        res.json(recommendations);

    } catch (error) {
        console.error("Insurance recommendation API error:", error);
        res.status(500).json({
            error: "Internal server error",
            message: "Unable to generate insurance recommendations"
        });
    }
};

// Get available insurance plans
exports.getAvailablePlans = async (req, res) => {
    try {
        const plans = insuranceService.getInsurancePlans();
        res.json({ plans });
    } catch (error) {
        console.error("Get plans error:", error);
        res.status(500).json({ error: "Unable to fetch insurance plans" });
    }
};