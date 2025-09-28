const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const adminModel = sequelize.define(
  "admins",
  {
    admin_email: {
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement:false
    },
    admin_password: {
      type: DataTypes.STRING,
      autoIncrement: false,
      primaryKey: false,
    },
  },
  {
    tableName: "admins",
    timestamps: false,
  }
);
module.exports = adminModel;
