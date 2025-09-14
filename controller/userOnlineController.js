const { where } = require("sequelize");
const User = require("../models/userModelOnline");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

const getSpecificUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    if (isNaN(user_id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await User.find({user_id:user_id});
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

const createUser = async (req, res) => {
  try {
    const { user_id,user_name } = req.body;
    if (!user_name || !user_id) {
      return res.status(400).json({ error: "user_name is required" });
    }

    const newUser = await User.create({
        user_id : user_id,
        user_name:user_name,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const updateNameOfUser = async (req, res) => {
  try {
    const user_id = req.params.id;
    const { user_name } = req.body;

    if (!user_id || !user_name) {
      return res.status(400).json({ error: "Invalid input" });
    }

    const update = await User.updateOne({ user_id:user_id }, { user_name:user_name });

    if (!update) {
      return res
        .status(404)
        .json({ error: "User not found or name unchanged" });
    }

    res.json({ message: "Update complete" });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user_id = req.params.id;

    if (isNaN(parseInt(user_id))) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const deletedCount = await User.deleteOne({ user_id : user_id });

    if (deletedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getSpecificUser,
  getUsers,
  updateNameOfUser,
  deleteUser,
  createUser,
};
