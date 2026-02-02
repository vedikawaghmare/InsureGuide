const { getWeatherRisk } = require("./weather.service");
const { getDisasterRisk } = require("./disaster.service");
const { getSoilRisk } = require("./soil.service");

class InsuranceRecommendationService {

    // Insurance plan definitions
    getInsurancePlans() {
        return {
            PMFBY: {
                id: "pmfby",
                name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
                type: "Crop",
                category: "Government",
                covers: "Complete crop cycle insurance against non-preventable natural risks (Drought, Flood, Pests)",
                premium: "1.5% - 2% for Food/Oilseeds, 5% for Commercial/Horticultural",
                benefits: "Unified crop insurance, low farmer premium, full sum insured payout",
                governmentSupport: "Highly Subsided"
            },
            AYUSHMAN_BHARAT: {
                id: "pmjay",
                name: "PM-JAY (Ayushman Bharat)",
                type: "Health",
                category: "Government",
                covers: "Secondary and tertiary care hospitalization",
                premium: "Free for eligible families",
                benefits: "₹5 Lakh per family per year, cashless treatment at empanelled hospitals",
                governmentSupport: "100% Free for Eligible"
            },
            LIC_PMJJBY: {
                id: "pmjjby",
                name: "Pradhan Mantri Jeevan Jyoti Bima Yojana",
                type: "Life",
                category: "Government",
                covers: "Life cover of ₹2 Lakh on death due to any reason",
                premium: "₹436 per year",
                benefits: "Easy renewal via bank account, high settlement ratio",
                governmentSupport: "Low Cost"
            },
            PMSBY: {
                id: "pmsby",
                name: "Pradhan Mantri Suraksha Bima Yojana",
                type: "Accident",
                category: "Government",
                covers: "Accidental death and full/partial disability",
                premium: "₹20 per year",
                benefits: "₹2 Lakh for death/full disability, ₹1 Lakh for partial disability",
                governmentSupport: "Minimal Cost"
            },
            LIVESTOCK_ALLIANZ: {
                id: "livestock",
                name: "Kisan Livestock Insurance",
                type: "Livestock",
                category: "Commercial",
                covers: "Cattle, buffalo, goat loss due to disease, accidents, natural calamities",
                premium: "₹500-2,000 per animal",
                benefits: "Market value compensation for animal loss",
                governmentSupport: "Optional Subsidy"
            },
            WEATHER_SHIELD: {
                id: "weather",
                name: "Weather-Based Index Insurance (WBCIS)",
                type: "Weather",
                category: "Government/Private",
                covers: "Income loss due to excess/deficit rainfall, heat/wind variations",
                premium: "Subsidized by State/Central Govt",
                benefits: "Automatic payouts based on weather station data",
                governmentSupport: "Subsidized"
            }
        };
    }

    // Rule-based recommendation engine
    generateRecommendations(weatherRisk, soilRisk, disasterRisk, weatherData) {
        const recommendations = [];
        const plans = this.getInsurancePlans();
        // ✅ Derive overall weather risk (since it doesn't exist naturally)
        const overallWeatherRisk =
            weatherRisk.floodRisk === "HIGH" ||
                weatherRisk.droughtRisk === "HIGH" ||
                weatherRisk.heatRisk === "HIGH"
                ? "HIGH"
                : weatherRisk.floodRisk === "MEDIUM" ||
                    weatherRisk.droughtRisk === "MEDIUM" ||
                    weatherRisk.heatRisk === "MEDIUM"
                    ? "MEDIUM"
                    : "LOW";

        // Rule 1: High flood/drought risk → PMFBY
        if (weatherRisk.floodRisk === "HIGH" || weatherRisk.droughtRisk === "HIGH") {
            recommendations.push({
                ...plans.PMFBY,
                reason: `High ${weatherRisk.floodRisk === "HIGH" ? "flood" : "drought"} risk detected in your area. Protect your crops with PMFBY.`,
                priority: 1
            });
        }

        // Rule 2: High disaster risk → PMSBY
        if (disasterRisk.disasterRisk === "HIGH") {
            recommendations.push({
                ...plans.PMSBY,
                reason: "Increased regional disaster risk detected. Accidental protection via PMSBY recommended.",
                priority: 1
            });
        }

        // Rule 3: High temperature → Ayushman Bharat
        if (weatherData.temperature > 35 || weatherRisk.heatRisk === "HIGH") {
            recommendations.push({
                ...plans.AYUSHMAN_BHARAT,
                reason: `Extreme heat (${weatherData.temperature}°C) increases medical risks. Family coverage via PM-JAY is essential.`,
                priority: 2
            });
        }

        // Rule 4: Poor soil fertility → Weather Shield
        if (soilRisk.fertilityRisk === "HIGH" || soilRisk.soilHealth === "POOR") {
            recommendations.push({
                ...plans.WEATHER_SHIELD,
                reason: `Unstable soil conditions in ${soilRisk.district}. Index-based weather insurance protects your income.`,
                priority: 2
            });
        }

        // Rule 5: Medium weather risk → Livestock
        if (overallWeatherRisk === "MEDIUM" || overallWeatherRisk === "HIGH") {
            recommendations.push({
                ...plans.LIVESTOCK_ALLIANZ,
                reason: `Potential climate stress on livestock detected. Protect your cattle assets.`,
                priority: 3
            });
        }

        // Rule 6: Always recommend life insurance
        if (recommendations.length < 3) {
            recommendations.push({
                ...plans.LIC_PMJJBY,
                reason: "Low-cost life coverage is a basic requirement for all families.",
                priority: 3
            });
        }

        // Sort by priority and remove duplicates
        return recommendations
            .sort((a, b) => a.priority - b.priority)
            .filter((plan, index, self) =>
                index === self.findIndex(p => p.name === plan.name)
            )
            .slice(0, 3); // Top 3 recommendations
    }

    // Main recommendation function
    async getLocationBasedRecommendations(lat, lon, district) {
        try {
            // Get risk data from existing services
            const [weatherRisk, disasterRisk, soilRisk] = await Promise.all([
                getWeatherRisk(lat, lon),
                getDisasterRisk(),
                getSoilRisk(lat, lon)

            ]);

            // Generate recommendations using rules
            const recommendations = this.generateRecommendations(
                weatherRisk,
                soilRisk,
                disasterRisk,
                weatherRisk // Contains temperature data
            );

            // Create risk summary
            const riskSummary = {
                weatherRisk: weatherRisk.overallRisk || "MEDIUM",
                soilRisk: soilRisk.soilRisk || "MEDIUM",
                disasterRisk: disasterRisk.disasterRisk || "LOW"
            };

            return {
                location: { lat: parseFloat(lat), lon: parseFloat(lon), district },
                riskSummary,
                recommendedPlans: recommendations,
                riskDetails: {
                    weather: weatherRisk,
                    soil: soilRisk,
                    disaster: disasterRisk
                }
            };

        } catch (error) {
            console.error("Insurance recommendation error:", error);

            // Fallback recommendations
            return {
                location: { lat: parseFloat(lat), lon: parseFloat(lon), district },
                riskSummary: {
                    weatherRisk: "MEDIUM",
                    soilRisk: "MEDIUM",
                    disasterRisk: "MEDIUM"
                },
                recommendedPlans: [{
                    ...this.getInsurancePlans().CROP_INSURANCE,
                    reason: "Basic crop protection recommended. Unable to assess specific risks at this time.",
                    priority: 1
                }],
                error: "Unable to fetch complete risk data"
            };
        }
    }
}

module.exports = new InsuranceRecommendationService();