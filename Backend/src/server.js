require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const passport = require("passport");
const connectDB = require("./config/connectDB");

// Routes
const authRoutes = require("./routes/auth");
const messageRouter = require("./routes/message.router");
const authenticateJWT = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect DB
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,
}));

// Initialize Passport
require("./config/passport"); // Passport GoogleStrategy
app.use(passport.initialize());

// Routes
app.use("/", authRoutes);
app.use("/api/user", messageRouter);

// Protected test route
app.get("/api/protected", authenticateJWT, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

// Root route
app.get("/", (req, res) => {
  res.send({ message: "Hello from backend" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
