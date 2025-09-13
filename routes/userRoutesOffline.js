const express = require("express");
const router = express.Router();
const bodyMiddleWare = require("../middlewares/bodyCheckMiddleware");
const {
  getUsers,
  deleteUser,
  updateNameOfUser,
  getSpecificUser,
  createUser,
} = require("../controller/userOfflineController");

router.get("offline/", getUsers);
router.get("offline/:id", getSpecificUser);
router.post("offline/", bodyMiddleWare, createUser);
router.patch("offline/:id", bodyMiddleWare, updateNameOfUser);
router.delete("offline/:id", deleteUser);

module.exports = router;
