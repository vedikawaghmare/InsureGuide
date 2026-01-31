const { getWeatherRisk } = require("../services/weather.service");
const { getDisasterRisk } = require("../services/disaster.service");
const { getSoilRisk } = require("../services/soil.service");

exports.getRisk = async (req, res) => {
    const { lat, lon } = req.query;

    const weather = await getWeatherRisk(lat, lon);
    const disaster = await getDisasterRisk();
    const soil = await getSoilRisk(lat, lon);

    res.json({
        weather,
        disaster,
        soil
    });
};
