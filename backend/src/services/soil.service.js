const axios = require("axios");

// FREE REAL SOIL API – NO KEY REQUIRED
const getSoilRisk = async (lat, lon) => {
    const res = await axios.get(
        "https://rest.isric.org/soilgrids/v2.0/properties/query",
        {
            params: {
                lat,
                lon,
                properties: ["clay", "sand", "soc", "phh2o"],
                depth: "0-5cm"
            }
        }
    );

    const soil = res.data.properties;

    const clay = soil.clay?.mean ?? 25;
    const sand = soil.sand?.mean ?? 45;
    const organicCarbon = soil.soc?.mean ?? 1.5;
    const pH = soil.phh2o?.mean ?? 6.8;

    // ---- Risk logic (same style as weather) ----
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
        soilHealth
    };
};

module.exports = { getSoilRisk };
