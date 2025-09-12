const { Sequelize } = require("sequelize");
const mySequlize = new Sequelize("minimis_db", "mk", "1822", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

module.exports = mySequlize;
