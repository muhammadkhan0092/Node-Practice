const express = require("express");
const router = express.Router();
const adminController = require("../controller/adminController");


router.post("/signup",adminController.createNewAdmin);
router.post("/login",adminController.loginAdmin)

module.exports = router;
