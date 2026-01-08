require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://trello-clone-two-xi.vercel.app"
  ],
  credentials: true
}));

app.use(express.json());

// Log all requests (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Test route
app.get("/", (req, res) => {
  res.json({ 
    message: "Trello Clone API is running",
    environment: process.env.NODE_ENV || "development",
    endpoints: {
      boards: "/boards",
      lists: "/lists",
      cards: "/cards",
      dbTest: "/db-test"
    }
  });
});

// Database test
app.get("/db-test", async (req, res) => {
  try {
    const pool = require("./db");
    const result = await pool.query("SELECT NOW() as time, version() as version");
    res.json({ 
      success: true, 
      timestamp: result.rows[0].time,
      database: "connected",
      version: result.rows[0].version
    });
  } catch (error) {
    console.error("Database test error:", error);
    res.status(500).json({ 
      success: false, 
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Load routes with error handling
try {
  const boardRoutes = require("./routes/boardRoutes");
  const listRoutes = require("./routes/listRoutes");
  const cardRoutes = require("./routes/cardRoutes");

  app.use("/boards", boardRoutes);
  app.use("/lists", listRoutes);
  app.use("/cards", cardRoutes);

  console.log("✅ All routes loaded successfully");
} catch (error) {
  console.error("❌ Error loading routes:", error);
  process.exit(1);
}

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: "Route not found",
    path: req.path,
    method: req.method,
    availableRoutes: ["/", "/boards", "/lists", "/cards", "/db-test"]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("Error:", error);
  res.status(500).json({ 
    error: error.message || "Internal server error",
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
  });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Database: ${process.env.DATABASE_URL ? '✅ configured' : '❌ NOT configured'}`);
  console.log(`CORS enabled for:`);
  console.log(`  - http://localhost:5173`);
  console.log(`  - http://localhost:3000`);
  console.log(`  - https://trello-clone-two-xi.vercel.app`);
});

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled Rejection:', error);
  process.exit(1);
});
