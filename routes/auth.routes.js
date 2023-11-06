const express = require("express");
const db = require("../data/databse");
const authController = require("../controllers/auth.controller");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.get("/signup", authController.getSignup);
router.post("/signup", authController.signup);
router.post("/logout", authController.logout);
router.get("/login", authController.getLogin);
router.post("/login", authController.login);

module.exports = router;
