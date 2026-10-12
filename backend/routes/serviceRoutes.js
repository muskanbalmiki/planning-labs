const express = require("express");
const router = express.Router();

const Service = require("../models/Services");

// GET all services
router.get("/", async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch services"
        });
    }
});

// POST a new service
router.post("/", async (req, res) => {
    try {
        const service = new Service(req.body);

        const savedService = await service.save();

        res.status(201).json(savedService);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to create service",
            error: error.message
        });
    }
});

module.exports = router;