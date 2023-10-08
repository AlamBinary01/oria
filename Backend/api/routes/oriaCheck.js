const express = require("express");
const checkAuth = require("../middleware/check-Auth"); // Make sure the path is correct
const router = express.Router();

// Apply the checkAuth middleware to a specific route
router.get("/secure", checkAuth, (req, res) => {
    res.status(200).json({ message: "You have access to this secure route!" });
});

// Define a non-secure route
router.get("/",checkAuth, (req, res) => {
    res.status(200).json({ message: "OK, perfect working" });
});

module.exports = router;
