const mongoose = require("mongoose");

const surveySchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true,
        },

        village: {
            type: String,
            required: true,
            trim: true,
        },

        landSize: {
            type: Number, // in acres
            required: true,
        },

        cropType: {
            type: String,
            required: true,
        },

        hasLivestock: {
            type: Boolean,
            default: false,
        },

        hasEquipment: {
            type: Boolean,
            default: false,
        },

        wantsHealthInsurance: {
            type: Boolean,
            default: false,
        },

        language: {
            type: String, // hi, mr, en etc.
            default: "en",
        },
    },
    {
        timestamps: true, // createdAt & updatedAt auto
    }
);

module.exports = mongoose.model("Survey", surveySchema);
