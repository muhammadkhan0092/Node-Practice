const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "users",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: false,
    },
  },
  {
    tableName: "users",
    timestamps: false,
  }
);
module.exports = User;
