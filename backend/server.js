// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

// Load environment variables from .env (locally)
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "https://smart-todo-frontend-t25c.onrender.com",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Import routes
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authroutes");
const adminRoutes = require("./routes/adminroutes");

// Register API routes
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// ✅ Optional test endpoint
app.get("/api/auth/test", (req, res) => {
  res.json({ message: "API working" });
});

// ❌ Remove frontend serving since Render frontend is separate
// const buildPath = path.join(__dirname, "../frontend/build");
// if (fs.existsSync(buildPath)) {
//   app.use(express.static(buildPath));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(buildPath, "index.html"));
//   });
// }

// Connect to MongoDB
const mongoUri = process.env.MONGO_URI || process.env.MONGOURL || "";
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
