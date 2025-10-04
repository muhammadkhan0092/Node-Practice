const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");


router.post("/signup",adminController.createNewAdmin);
router.post("/login/session",adminController.loginAdminWithSessionId);
router.post("/login/token",adminController.loginAdminWithToken);

module.exports = router;
