const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/signup", authController.signup); //inscription
router.post("/login", authController.login); //login
router.get("/logout", authController.logout); //logout

module.exports = router;
