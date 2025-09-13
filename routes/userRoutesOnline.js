const express = require("express");
const router = express.Router();
const bodyMiddleWare = require("../middlewares/bodyCheckMiddleware");
const {
  getUsers,
  deleteUser,
  updateNameOfUser,
  getSpecificUser,
  createUser,
} = require("../controller/userOnlineController");

router.get("/online/", getUsers);
router.get("/online/:id", getSpecificUser);
router.post("/online/", bodyMiddleWare, createUser);
router.patch("/online/:id", bodyMiddleWare, updateNameOfUser);
router.delete("/online/:id", deleteUser);

module.exports = router;
