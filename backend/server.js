// const serviceRoutes = require("./routes/serviceRoutes");

// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// const connectDB = require("./config/db");

// dotenv.config();

// const app = express();

// // Connect MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Test route
// app.get("/", (req, res) => {
//     res.json({
//         message: "Planning Labs Backend is running"
//     });
// });

// // Port
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//     console.log(`Server running at http://localhost:${PORT}`);
// });

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const serviceRoutes = require("./routes/serviceRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
connectDB();

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Planning Labs Backend is running"
    });
});

// Services API
app.use("/api/services", serviceRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});