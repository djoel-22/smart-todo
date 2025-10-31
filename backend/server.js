// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables from .env (locally)
// On Render set environment variables in the dashboard, do NOT commit .env
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());                      // allow cross-origin (customize origin in production)
app.use(express.json());              // parse JSON bodies

// Import routes
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authroutes");
const adminRoutes = require("./routes/adminroutes");

// Register API routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Serve static frontend in production (adjust path if your build output differs)
const buildPath = path.join(__dirname, "../frontend/build");
if (require("fs").existsSync(buildPath)) {
  app.use(express.static(buildPath));

  // Send index.html for any other route — supports client-side routing (React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGOURL || "";
mongoose
  .connect(mongoUri, {
    // these options are optional with modern mongoose versions
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // In production you may want to exit process to get a restart by the host
  });

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
