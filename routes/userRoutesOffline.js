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

router.get("/", getUsers);
router.get("/:id", getSpecificUser);
router.post("/", bodyMiddleWare, createUser);
router.patch("/:id", bodyMiddleWare, updateNameOfUser);
router.delete("/:id", deleteUser);

module.exports = router;
