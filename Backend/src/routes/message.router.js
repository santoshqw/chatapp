const express = require("express");
const router = express.Router();
const { sendMessage ,getMessage} = require("../controllers/message.controller");
const authenticateJWT = require("../middleware/auth");

// Send message to a user
router.post("/send/:id", authenticateJWT, sendMessage);

// Get messages (optional)
router.get("/get/:id", authenticateJWT, getMessage);

module.exports = router;
