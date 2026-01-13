const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google login
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get(
  "/auth/google/callback",
  (req, res, next) => {
    passport.authenticate("google", { session: false }, (err, data) => {
      if (err) return res.status(500).json({ success: false, error: err.message });
      if (!data) return res.status(401).json({ success: false, message: "Authentication failed" });

      // Set JWT cookie
      res.cookie("jwt", data.token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
      });

      // Redirect to frontend
      res.redirect("http://localhost:5173");
    })(req, res, next);
  }
);

module.exports = router;
