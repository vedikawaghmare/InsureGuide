const translations = require("../utils/translations");

const getRecommendations = (survey) => {
    const lang = survey.language || "en";
    const t = translations[lang] || translations.en;

    const recommendations = [];

    if (survey.cropType) {
        recommendations.push({
            type: t.crop.type,
            reason: t.crop.reason,
            priority: "High",
        });
    }

    if (survey.hasLivestock) {
        recommendations.push({
            type: t.livestock.type,
            reason: t.livestock.reason,
            priority: "Medium",
        });
    }

    if (survey.hasEquipment) {
        recommendations.push({
            type: t.equipment.type,
            reason: t.equipment.reason,
            priority: "Medium",
        });
    }

    if (survey.wantsHealthInsurance) {
        recommendations.push({
            type: t.health.type,
            reason: t.health.reason,
            priority: "High",
        });
    }

    return recommendations;
};

module.exports = { getRecommendations };
