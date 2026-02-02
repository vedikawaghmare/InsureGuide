const axios = require("axios");

// FAIL-SAFE SOIL API WITH COMPREHENSIVE ERROR HANDLING
const getSoilRisk = async (lat, lon) => {
    try {
        console.log(`Fetching soil data for lat: ${lat}, lon: ${lon}`);
        
        const res = await axios.get(
            "https://rest.isric.org/soilgrids/v2.0/properties/query",
            {
                params: {
                    lat,
                    lon,
                    properties: ["clay", "sand", "soc", "phh2o"],
                    depth: "0-5cm"
                },
                timeout: 8000 // 8 second timeout
            }
        );

        console.log('Soil API response received');
        const soil = res.data?.properties || {};

        const clay = soil.clay?.mean ?? getDistrictFallback(lat, lon, 'clay');
        const sand = soil.sand?.mean ?? getDistrictFallback(lat, lon, 'sand');
        const organicCarbon = soil.soc?.mean ?? getDistrictFallback(lat, lon, 'soc');
        const pH = soil.phh2o?.mean ?? getDistrictFallback(lat, lon, 'ph');

        const soilData = calculateSoilRisk(clay, sand, organicCarbon, pH, lat, lon);
        console.log('Soil data processed:', soilData);
        return soilData;

    } catch (error) {
        console.error('Soil API Error:', error.message);
        
        // Return district-based fallback data
        return getDistrictSoilData(lat, lon);
    }
};

// Calculate soil risk from parameters
function calculateSoilRisk(clay, sand, organicCarbon, pH, lat, lon) {
    let floodRisk = "LOW";
    if (clay > 40) floodRisk = "HIGH";
    else if (clay > 30) floodRisk = "MEDIUM";

    let droughtRisk = "LOW";
    if (sand > 70) droughtRisk = "HIGH";
    else if (sand > 50) droughtRisk = "MEDIUM";

    let fertilityRisk = "LOW";
    if (organicCarbon < 1) fertilityRisk = "HIGH";
    else if (organicCarbon < 2) fertilityRisk = "MEDIUM";

    let soilHealth = "GOOD";
    if (pH < 5.5 || pH > 8.5) soilHealth = "POOR";
    else if (pH < 6 || pH > 8) soilHealth = "MODERATE";

    return {
        clay_percent: clay,
        sand_percent: sand,
        organic_carbon: organicCarbon,
        soil_pH: pH,
        floodRisk,
        droughtRisk,
        fertilityRisk,
        soilHealth,
        district: getDistrictName(lat, lon)
    };
}

// District-based fallback data
function getDistrictSoilData(lat, lon) {
    const district = getDistrictName(lat, lon);
    const fallbackData = getRegionalSoilData(lat, lon);
    
    console.log(`Using fallback soil data for ${district}`);
    
    return {
        ...calculateSoilRisk(
            fallbackData.clay,
            fallbackData.sand,
            fallbackData.soc,
            fallbackData.ph,
            lat,
            lon
        ),
        error: "Soil API unavailable, using regional data"
    };
}

// Get district name from coordinates
function getDistrictName(lat, lon) {
    // Maharashtra districts
    if (lat >= 18.0 && lat <= 20.0 && lon >= 73.0 && lon <= 77.0) {
        if (lat >= 18.4 && lat <= 18.6 && lon >= 73.7 && lon <= 73.9) return "Pune";
        if (lat >= 19.0 && lat <= 19.3 && lon >= 72.7 && lon <= 73.0) return "Mumbai";
        if (lat >= 19.8 && lat <= 20.2 && lon >= 75.0 && lon <= 75.4) return "Aurangabad";
        return "Maharashtra";
    }
    // Karnataka districts
    if (lat >= 12.0 && lat <= 16.0 && lon >= 74.0 && lon <= 78.0) {
        if (lat >= 12.9 && lat <= 13.1 && lon >= 77.5 && lon <= 77.7) return "Bangalore";
        return "Karnataka";
    }
    // Tamil Nadu districts
    if (lat >= 8.0 && lat <= 13.5 && lon >= 76.0 && lon <= 80.5) {
        if (lat >= 13.0 && lat <= 13.2 && lon >= 80.1 && lon <= 80.3) return "Chennai";
        return "Tamil Nadu";
    }
    // Gujarat districts
    if (lat >= 20.0 && lat <= 24.7 && lon >= 68.0 && lon <= 74.5) {
        if (lat >= 23.0 && lat <= 23.1 && lon >= 72.5 && lon <= 72.7) return "Ahmedabad";
        return "Gujarat";
    }
    
    return "Unknown District";
}

// Regional soil characteristics
function getRegionalSoilData(lat, lon) {
    // Maharashtra - Black cotton soil
    if (lat >= 18.0 && lat <= 20.0 && lon >= 73.0 && lon <= 77.0) {
        return { clay: 45, sand: 25, soc: 1.8, ph: 7.2 };
    }
    // Karnataka - Red laterite soil
    if (lat >= 12.0 && lat <= 16.0 && lon >= 74.0 && lon <= 78.0) {
        return { clay: 35, sand: 40, soc: 1.5, ph: 6.8 };
    }
    // Tamil Nadu - Alluvial soil
    if (lat >= 8.0 && lat <= 13.5 && lon >= 76.0 && lon <= 80.5) {
        return { clay: 30, sand: 45, soc: 2.1, ph: 7.0 };
    }
    // Gujarat - Sandy loam
    if (lat >= 20.0 && lat <= 24.7 && lon >= 68.0 && lon <= 74.5) {
        return { clay: 25, sand: 55, soc: 1.3, ph: 7.5 };
    }
    
    // Default Indian soil
    return { clay: 32, sand: 42, soc: 1.6, ph: 6.9 };
}

// Get fallback value for specific parameter
function getDistrictFallback(lat, lon, param) {
    const regional = getRegionalSoilData(lat, lon);
    return regional[param] || 0;
}

module.exports = { getSoilRisk };
