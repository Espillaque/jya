
var sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");

// It defines user model
const Usuario = sequelize.define(
  "Usuario",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    correo_electronico: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Usuarios", 
    timestamps: false, // It doesn´t create createdAt y updatedAt
  },
);

// It defines game model
const Juego = sequelize.define(
  "Juego",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    max_jugadores: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Juegos",
    timestamps: false,
  },
);

// It defines the event model
const Evento = sequelize.define(
  "Evento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    master_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "usuarios", 
        key: "id",
      },
    },
    juego_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "juegos", 
        key: "id",
      },
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.TEXT,
    },
    descripcion: {
      type: DataTypes.TEXT, 
    },
  },
  { sequelize, modelName: "evento", timestamps: false },
);

//It defines associations between models with foreign keys
Evento.belongsTo(Juego, { foreignKey: "juego_id" });
Evento.belongsTo(Usuario, { foreignKey: "master_id" });

Juego.hasMany(Evento, { foreignKey: "juego_id" });
Usuario.hasMany(Evento, { foreignKey: "master_id" });

// It defines the participation model
const ParticipacionEvento = sequelize.define(
  "ParticipacionEvento",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Usuario, 
        key: "id",
      },
    },
    juego_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Juego, 
        key: "id",
      },
    },
    evento_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Evento, 
        key: "id",
      },
    },
  },
  {
    tableName: "participacion_eventos", 
    timestamps: false, 
  },
);

//It defines associations between models with foreign keys
ParticipacionEvento.belongsTo(Usuario, { foreignKey: "usuario_id" });
ParticipacionEvento.belongsTo(Juego, { foreignKey: "juego_id" });
ParticipacionEvento.belongsTo(Evento, { foreignKey: "evento_id" });

Usuario.hasMany(ParticipacionEvento, { foreignKey: "usuario_id" });
Juego.hasMany(ParticipacionEvento, { foreignKey: "juego_id" });
Evento.hasMany(ParticipacionEvento, { foreignKey: "evento_id" });

module.exports = { Usuario, Juego, Evento, ParticipacionEvento };
