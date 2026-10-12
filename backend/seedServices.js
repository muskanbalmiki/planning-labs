require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Services");

const services = [

    // -----------------------------
    // EXPERIENTIAL MARKETING
    // -----------------------------

    {
        slug: "events",
        name: "Events",
        summary: "End-to-end planning and live execution for corporate and consumer events of any size.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "exhibitions-stall-design",
        name: "Exhibitions & Stall Design",
        summary: "Custom stall design and fabrication that turns floor space into footfall.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "brand-activations",
        name: "Brand Activations",
        summary: "On-ground activations that convert audience attention into brand recall.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "mice",
        name: "MICE",
        summary: "Meetings, incentives, conferences and exhibitions delivered end to end, in India and abroad.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "conferences-product-launches",
        name: "Conferences & Product Launches",
        summary: "High-stakes launch moments produced with broadcast-grade precision.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "employee-engagement",
        name: "Employee Engagement",
        summary: "Town halls, offsites and culture-building experiences for growing teams.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "outdoor-advertising",
        name: "Outdoor Advertising",
        summary: "OOH planning and buying across hoardings, transit and experiential media.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },

    {
        slug: "event-production-fabrication",
        name: "Event Production & Fabrication",
        summary: "In-house fabrication, sound, light and stage engineering under one roof.",
        vertical: "experiential-marketing",
        verticalName: "Experiential Marketing"
    },


    // -----------------------------
    // DIGITAL MARKETING
    // -----------------------------

    {
        slug: "social-media-management",
        name: "Social Media Management",
        summary: "Always-on content, community and channel strategy across platforms.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "performance-marketing",
        name: "Performance Marketing",
        summary: "Paid media planning and optimisation across search, social and programmatic.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "seo",
        name: "SEO",
        summary: "Technical, content and authority SEO built for compounding organic growth.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "influencer-marketing",
        name: "Influencer Marketing",
        summary: "Creator partnerships mapped to audience and outcome, not just reach.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "video-commercial-production",
        name: "Video & Commercial Production",
        summary: "Scripts to final cut — brand films, ads and social-first video.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "website-development",
        name: "Website Development",
        summary: "Fast, conversion-led websites built on modern, manageable stacks.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "creative-design",
        name: "Creative Design",
        summary: "Brand and campaign design systems that hold up across every touchpoint.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    },

    {
        slug: "cgi-digital-content",
        name: "CGI & Digital Content",
        summary: "3D and CGI content for product, launch and social storytelling.",
        vertical: "digital-marketing",
        verticalName: "Digital Marketing"
    }
];


async function seedDatabase() {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Remove existing services
        await Service.deleteMany({});

        // Insert all services
        await Service.insertMany(services);

        console.log("✅ All services inserted successfully!");

        // Close database
        await mongoose.connection.close();

    } catch (error) {

        console.error("❌ Seed failed:", error);

        process.exit(1);
    }
}

seedDatabase();