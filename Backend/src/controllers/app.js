// Import the Express framework to build the web server
const express = require('express');

// Import CORS middleware to allow cross-origin requests (e.g., React frontend calling Express backend)
const cors = require('cors');

// Import Helmet to set various secure HTTP headers automatically
const helmet = require('helmet');

// Import dotenv to load environment variables from a .env file into process.env
const dotenv = require('dotenv');

// Load environment variables (e.g., PORT, DB URI)
dotenv.config();

// Create an instance of an Express application
const app = express();

// Apply Helmet middleware to secure the app by setting HTTP headers (e.g., XSS, frameguard, HSTS)
app.use(helmet());

// Enable CORS so that requests from other origins (like the frontend) are allowed
app.use(cors({
  origin: "https://localhost:5173",
  credentials: true
}));

// Enable Express to parse incoming JSON payloads (used in POST and PUT requests)
app.use(express.json());

// Routes
const authRoutes = require("./routes/authRoutes");
const { protect } = require("./middleware/authMiddleware");

app.use("/api/auth", authRoutes);

// Example protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: `Welcome, user ${req.user.id}! You have accessed protected data.`,
    timestamp: new Date()
  });
});

// Export the app so it can be used in server.js
module.exports = app;
