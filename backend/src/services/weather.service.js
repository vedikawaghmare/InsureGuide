const axios = require("axios");

// FREE API – NO KEY REQUIRED
const getWeatherRisk = async (lat, lon) => {
    const res = await axios.get(
        "https://api.open-meteo.com/v1/forecast",
        {
            params: {
                latitude: lat,
                longitude: lon,
                hourly: "rain",
                forecast_days: 1
            }
        }
    );

    const rain = res.data.hourly.rain[0] || 0;

    let risk = "LOW";
    if (rain > 20) risk = "HIGH";
    else if (rain > 5) risk = "MEDIUM";

    return {
        rainfall_mm: rain,
        floodRisk: risk
    };
};

module.exports = { getWeatherRisk };
