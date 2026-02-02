const axios = require("axios");

// FREE API – NO KEY REQUIRED
const getWeatherRisk = async (lat, lon) => {
    try {
        console.log(`Fetching weather data for lat: ${lat}, lon: ${lon}`);
        
        const res = await axios.get(
            "https://api.open-meteo.com/v1/forecast",
            {
                params: {
                    latitude: lat,
                    longitude: lon,
                    current: "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code",
                    hourly: "rain",
                    forecast_days: 1
                },
                timeout: 10000 // 10 second timeout
            }
        );

        console.log('Weather API response received');

        const rain = res.data.hourly?.rain?.[0] || 0;
        const temp = res.data.current?.temperature_2m || 25;
        const humidity = res.data.current?.relative_humidity_2m || 60;
        const windSpeed = res.data.current?.wind_speed_10m || 3;
        const weatherCode = res.data.current?.weather_code || 0;

        let floodRisk = "LOW";
        if (rain > 20) floodRisk = "HIGH";
        else if (rain > 5) floodRisk = "MEDIUM";

        let droughtRisk = "LOW";
        if (rain < 1 && humidity < 30) droughtRisk = "HIGH";
        else if (rain < 3) droughtRisk = "MEDIUM";

        let heatRisk = "LOW";
        if (temp > 35) heatRisk = "HIGH";
        else if (temp > 30) heatRisk = "MEDIUM";

        // Weather condition based on weather code
        let condition = "clear";
        if (weatherCode >= 61 && weatherCode <= 67) condition = "rain";
        else if (weatherCode >= 71 && weatherCode <= 77) condition = "snow";
        else if (weatherCode >= 80 && weatherCode <= 82) condition = "showers";

        const weatherData = {
            rainfall_mm: rain,
            temperature: temp,
            humidity: humidity,
            windSpeed: windSpeed,
            condition: condition,
            floodRisk: floodRisk,
            droughtRisk: droughtRisk,
            heatRisk: heatRisk
        };

        console.log('Weather data processed:', weatherData);
        return weatherData;

    } catch (error) {
        console.error('Weather API Error:', error.message);
        
        // Return fallback data if API fails
        return {
            rainfall_mm: 2.5,
            temperature: 28,
            humidity: 65,
            windSpeed: 4.2,
            condition: "partly_cloudy",
            floodRisk: "MEDIUM",
            droughtRisk: "LOW",
            heatRisk: "MEDIUM",
            error: "Weather API unavailable, using fallback data"
        };
    }
};

module.exports = { getWeatherRisk };
