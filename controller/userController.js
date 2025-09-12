const { where } = require("sequelize");
const User = require("../models/userModel");
const getUsers = async (req, res) => {
  const user = await User.findAll();
  console.log(`user is ${user}`);
  res.json({
    user,
  });
};

const updateNameOfUser = async (req, res) => {
  const user_id = parseInt(req.params.id);
  const { user_name } = req.body;
  const update = await User.update({ user_name }, { where: { user_id } });
  res.send(`${update[0]}? "Update Complete":"Error Updating"`);
};

const deleteUser = async (req, res) => {
  const user_id = parseInt(req.params.id);
  const deleteResponse = await User.destroy({ where: { user_id } });
  res.end("User Delete Request Received");
};

const createUser = async (req, res) => {
  const { user_name } = req.body;
  const createUser = await User.create({ user_name });
  res.end("User Created Successfully");
};

const getSpecificUser = async (req, res) => {
  const user_id = parseInt(req.params.id);
  const getSpecificUser = await User.findByPk(user_id);
  res.json(getSpecificUser);
};
module.exports = {
  getSpecificUser,
  getUsers,
  updateNameOfUser,
  deleteUser,
  createUser,
};
