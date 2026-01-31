const axios = require("axios");

const getDisasterRisk = async () => {
    try {
        // NASA EONET API for current events
        const res = await axios.get("https://eonet.gsfc.nasa.gov/api/v3/events");

        const events = res.data?.events || [];
        const count = events.length;

        // Basic risk assessment
        let risk = "LOW";
        if (count > 10) risk = "HIGH";
        else if (count > 3) risk = "MEDIUM";

        return {
            recentDisasters: count,
            disasterRisk: risk,
            events: events.map(e => ({
                id: e.id,
                title: e.title,
                category: e.categories.map(c => c.title),
                sources: e.sources,
                date: e.geometry[e.geometry.length - 1]?.date
            }))
        };
    } catch (error) {
        console.error("Disaster API error:", error.message);

        // fallback if API fails
        return {
            recentDisasters: 0,
            disasterRisk: "MEDIUM",
            events: []
        };
    }
};

module.exports = { getDisasterRisk };
