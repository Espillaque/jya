const { Sequelize } = require("sequelize");

// Sequelize configuration to access the database
const sequelize = new Sequelize("juegos_de_mesa", "dwes", "dwes", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
