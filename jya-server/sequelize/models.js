// Definición del modelo de usuario

var sequelize = require("./config").sequelize;
const { DataTypes } = require("sequelize");

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
    tableName: "Usuarios", // Nombre de la tabla en plural
    timestamps: false, // Si no usas createdAt y updatedAt
  },
);

// Definición del modelo Juego
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
        model: "usuarios", // nombre de la tabla en la base de datos
        key: "id",
      },
    },
    juego_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "juegos", // nombre de la tabla en la base de datos
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
      // Aquí se añade la nueva columna 'descripcion'
      type: DataTypes.TEXT, // Tipo de datos para la descripción
    },
  },
  { sequelize, modelName: "evento", timestamps: false },
);

Evento.belongsTo(Juego, { foreignKey: "juego_id" });
Evento.belongsTo(Usuario, { foreignKey: "master_id" });

Juego.hasMany(Evento, { foreignKey: "juego_id" });
Usuario.hasMany(Evento, { foreignKey: "master_id" });

// Definición del modelo de ParticipacionEvento
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
        model: Usuario, // Modelo al que hace referencia
        key: "id",
      },
    },
    juego_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Juego, // Modelo al que hace referencia
        key: "id",
      },
    },
    evento_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Evento, // Modelo al que hace referencia
        key: "id",
      },
    },
  },
  {
    tableName: "participacion_eventos", // Nombre de la tabla en la base de datos
    timestamps: false, // Desactivar timestamps si no los usas
  },
);

// Definir las relaciones
ParticipacionEvento.belongsTo(Usuario, { foreignKey: "usuario_id" });
ParticipacionEvento.belongsTo(Juego, { foreignKey: "juego_id" });
ParticipacionEvento.belongsTo(Evento, { foreignKey: "evento_id" });

Usuario.hasMany(ParticipacionEvento, { foreignKey: "usuario_id" });
Juego.hasMany(ParticipacionEvento, { foreignKey: "juego_id" });
Evento.hasMany(ParticipacionEvento, { foreignKey: "evento_id" });

module.exports = { Usuario, Juego, Evento, ParticipacionEvento };
