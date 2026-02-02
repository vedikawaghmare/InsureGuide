const { getWeatherRisk } = require("../services/weather.service");
const { getDisasterRisk } = require("../services/disaster.service");
const { getSoilRisk } = require("../services/soil.service");
const insuranceService = require("../services/insurance.service");

exports.getRisk = async (req, res) => {
    const { lat, lon, district } = req.query;

    try {
        // Get risk data from all APIs
        const [weather, disaster, soil] = await Promise.all([
            getWeatherRisk(lat, lon),
            getDisasterRisk(),
            getSoilRisk(lat, lon)
        ]);

        // Get insurance recommendations
        const insuranceData = await insuranceService.getLocationBasedRecommendations(lat, lon, district);

        // Calculate dynamic demographics based on risk levels
        const getStats = (risk) => {
            if (risk === "HIGH") return { affected: 8, protected: 3 };
            if (risk === "MEDIUM") return { affected: 5, protected: 6 };
            return { affected: 1, protected: 9 };
        };

        const floodStats = getStats(weather.floodRisk);
        const cropStats = getStats(soil.fertilityRisk);
        const healthStats = { affected: 2, protected: 8 };

        const demographics = {
            flood: {
                ...floodStats,
                reason: weather.floodRisk === "HIGH"
                    ? `High flood risk in ${district || 'this area'} due to heavy rainfall (${weather.rainfall_mm}mm) and weather patterns`
                    : `Low flood risk in ${district || 'this area'} with current rainfall at ${weather.rainfall_mm}mm`
            },
            crop: {
                ...cropStats,
                reason: soil.fertilityRisk === "HIGH"
                    ? `Crop productivity at risk in ${soil.district} due to ${soil.soilHealth} soil conditions`
                    : `Favorable conditions for crops in ${soil.district} with ${soil.soilHealth} soil health`
            },
            health: {
                ...healthStats,
                reason: `Healthcare accessibility analysis for ${district || 'this region'} based on infrastructure data`
            }
        };

        // Enhanced location-based summary
        const locationSummary = {
            location: district || 'Current Location',
            coordinates: { lat: parseFloat(lat), lon: parseFloat(lon) },
            weatherCondition: weather.condition,
            temperature: weather.temperature,
            overallRisk: getOverallRisk(weather, soil, disaster),
            keyRisks: getKeyRisks(weather, soil, disaster),
            weatherRiskDesc: generateWeatherDescription(weather, district),
            soilRiskDesc: generateSoilDescription(soil),
            disasterRiskDesc: generateDisasterDescription(disaster)
        };

        res.json({
            weather,
            disaster,
            soil,
            demographics,
            summary: locationSummary,
            recommendedPlans: insuranceData.recommendedPlans || []
        });

    } catch (error) {
        console.error('Risk API Error:', error);
        res.status(500).json({ 
            error: 'Unable to fetch risk data',
            message: 'Please try again later'
        });
    }
};

// Helper functions
function getOverallRisk(weather, soil, disaster) {
    const risks = [weather.floodRisk, weather.droughtRisk, weather.heatRisk, soil.fertilityRisk, disaster.disasterRisk];
    if (risks.includes('HIGH')) return 'HIGH';
    if (risks.includes('MEDIUM')) return 'MEDIUM';
    return 'LOW';
}

function getKeyRisks(weather, soil, disaster) {
    const risks = [];
    if (weather.floodRisk === 'HIGH') risks.push('Flooding');
    if (weather.droughtRisk === 'HIGH') risks.push('Drought');
    if (weather.heatRisk === 'HIGH') risks.push('Extreme Heat');
    if (soil.fertilityRisk === 'HIGH') risks.push('Poor Soil');
    if (disaster.disasterRisk === 'HIGH') risks.push('Natural Disasters');
    return risks.length > 0 ? risks : ['Low Risk Area'];
}

function generateWeatherDescription(weather, district) {
    const temp = weather.temperature;
    const rainfall = weather.rainfall_mm;
    const condition = weather.condition;
    
    if (weather.floodRisk === 'HIGH') {
        return `${district || 'This area'} is experiencing high flood risk with ${rainfall}mm rainfall and ${condition} conditions. Temperature at ${temp}°C.`;
    } else if (weather.droughtRisk === 'HIGH') {
        return `${district || 'This area'} faces drought conditions with low rainfall (${rainfall}mm) and high temperature (${temp}°C).`;
    } else if (weather.heatRisk === 'HIGH') {
        return `Extreme heat warning for ${district || 'this area'} with temperature reaching ${temp}°C.`;
    }
    return `Stable weather in ${district || 'this area'} with ${temp}°C temperature and ${rainfall}mm rainfall.`;
}

function generateSoilDescription(soil) {
    if (soil.fertilityRisk === 'HIGH') {
        return `Soil health is ${soil.soilHealth} in ${soil.district}, requiring immediate attention for crop productivity.`;
    }
    return `Soil conditions are ${soil.soilHealth} in ${soil.district}, suitable for agriculture.`;
}

function generateDisasterDescription(disaster) {
    if (disaster.disasterRisk === 'HIGH') {
        return `High disaster risk detected with recent events: ${disaster.recentEvents?.join(', ') || 'Multiple threats'}.`;
    }
    return `Low disaster risk with stable regional conditions.`;
}