const soilRiskByDistrict = {
    Pune: "LOW",
    Nashik: "MEDIUM",
    Vidarbha: "HIGH",
    Marathwada: "HIGH"
};

const getSoilRisk = (district) => {
    return {
        soilRisk: soilRiskByDistrict[district] || "MEDIUM"
    };
};

module.exports = { getSoilRisk };
