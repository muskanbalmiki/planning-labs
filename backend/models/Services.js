const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
    {
        slug: {
            type: String,
            required: true,
            unique: true
        },

        name: {
            type: String,
            required: true
        },

        summary: {
            type: String,
            required: true
        },

        vertical: {
            type: String,
            required: true
        },

        verticalName: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Service", serviceSchema);