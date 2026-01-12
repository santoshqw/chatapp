require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const passport = require("passport");
const authRoutes = require("./routes/auth");
const authenticateJWT = require("./middleware/auth");
const cors = require("cors");
const PORT =process.env.PORT;

// Connect to DB
connectDB();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
require("./config/passport");

// Initialize Passport
app.use(passport.initialize());

// Routes
app.use("/", authRoutes);

// Test protected route
app.get("/api/protected", authenticateJWT, (req, res) => {
  res.json({ message: "You are authorized!", user: req.user });
});

//server run on 3000 port
app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
