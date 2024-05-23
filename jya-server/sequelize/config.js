const { Sequelize } = require("sequelize");

// Configuración de Sequelize
const sequelize = new Sequelize("juegos_de_mesa", "dwes", "dwes", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = { sequelize };
