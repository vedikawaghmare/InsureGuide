const axios = require("axios");

const getDisasterRisk = async () => {
    try {
        const res = await axios.get("https://www.gdacs.org/api/disasters");

        const count = res.data?.features?.length || 0;

        let risk = "LOW";
        if (count > 10) risk = "HIGH";
        else if (count > 3) risk = "MEDIUM";

        return {
            recentDisasters: count,
            disasterRisk: risk
        };
    } catch (error) {
        // fallback so app never crashes
        return {
            recentDisasters: 0,
            disasterRisk: "MEDIUM"
        };
    }
};

module.exports = { getDisasterRisk };
