const { getWeatherRisk } = require("./weather.service");
const { getDisasterRisk } = require("./disaster.service");
const { getSoilRisk } = require("./soil.service");

class InsuranceRecommendationService {

    // Insurance plan definitions
    getInsurancePlans() {
        return {
            CROP_INSURANCE: {
                name: "Crop Insurance",
                covers: "Crop loss due to drought, flood, pest attacks, and weather damage",
                premium: "₹2,000-5,000 per season",
                benefits: "Up to 100% crop value compensation"
            },
            PROPERTY_INSURANCE: {
                name: "Property Insurance",
                covers: "House and property damage from natural disasters, fire, theft",
                premium: "₹3,000-8,000 per year",
                benefits: "Rebuilding costs and temporary accommodation"
            },
            HEALTH_INSURANCE: {
                name: "Health Insurance",
                covers: "Medical expenses, hospitalization, heat-related illnesses",
                premium: "₹5,000-15,000 per year",
                benefits: "Cashless treatment up to ₹5 lakhs"
            },
            LIVESTOCK_INSURANCE: {
                name: "Livestock Insurance",
                covers: "Cattle, buffalo, goat loss due to disease, accidents, natural calamities",
                premium: "₹500-2,000 per animal",
                benefits: "Market value compensation for animal loss"
            },
            WEATHER_INSURANCE: {
                name: "Weather-Based Insurance",
                covers: "Income loss due to excess/deficit rainfall, temperature variations",
                premium: "₹1,500-4,000 per season",
                benefits: "Automatic payouts based on weather data"
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

        // Rule 1: High flood/drought risk → Crop Insurance
        if (weatherRisk.floodRisk === "HIGH" || weatherRisk.droughtRisk === "HIGH") {
            recommendations.push({
                ...plans.CROP_INSURANCE,
                reason: `High ${weatherRisk.floodRisk === "HIGH" ? "flood" : "drought"} risk detected in your area. Protect your crops from weather damage.`,
                priority: 1
            });
        }

        // Rule 2: High disaster risk → Property Insurance  
        if (disasterRisk.disasterRisk === "HIGH") {
            recommendations.push({
                ...plans.PROPERTY_INSURANCE,
                reason: "Global disaster activity is currently high, which increases long-term environmental risk. Protect your home and property.",
                priority: 1
            });
        }

        // Rule 3: High temperature → Health Insurance
        if (weatherData.temperature > 35 || weatherRisk.heatRisk === "HIGH") {
            recommendations.push({
                ...plans.HEALTH_INSURANCE,
                reason: `High temperature (${weatherData.temperature}°C) increases heat-related health risks. Stay protected.`,
                priority: 2
            });
        }

        // Rule 4: Poor soil fertility → Agriculture Insurance
        if (soilRisk.fertilityRisk === "HIGH" || soilRisk.soilHealth === "POOR") {

            recommendations.push({
                ...plans.WEATHER_INSURANCE,
                reason: `Poor soil conditions in ${soilRisk.district} district. Weather-based insurance can help with income protection.`,
                priority: 2
            });
        }

        // Rule 5: Medium weather risk → Livestock Insurance
        if (overallWeatherRisk === "MEDIUM" || overallWeatherRisk === "HIGH") {

            recommendations.push({
                ...plans.LIVESTOCK_INSURANCE,
                reason: `Weather conditions may affect livestock health. Protect your animals from climate risks.`,
                priority: 3
            });
        }

        // Rule 6: Always recommend crop insurance for rural areas
        if (recommendations.length === 0) {
            recommendations.push({
                ...plans.CROP_INSURANCE,
                reason: "Basic crop protection recommended for all farmers. Start with essential coverage.",
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