const express = require("express");
const passport = require("passport");

const router = express.Router();

// Redirect user to Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback route
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, data) => {
      if (err) {
        console.error("Google callback error:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!data) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
      }

      
      res.cookie("jwt", data.token, {
        httpOnly: true,       
        secure: false,        
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: "lax"       
      });

      // Redirect  in this http://localhost:5173 URL
      res.redirect("http://localhost:5173");
    })(req, res, next);
  }
);

module.exports = router;

