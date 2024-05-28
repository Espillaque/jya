var express = require("express");
var router = express.Router();
var Evento = require("../sequelize/models").Evento;
var Usuario = require("../sequelize/models").Usuario;
var Juego = require("../sequelize/models").Juego;
var ParticipacionEvento = require("../sequelize/models").ParticipacionEvento;

router.post("/create", async (req, res) => {
  const { usuario_id, juego_id, evento_id } = req.body;

  try {
    // Validar si el usuario, el juego y el evento existen
    const usuario = await Usuario.findByPk(usuario_id);
    const juego = await Juego.findByPk(juego_id);
    const evento = await Evento.findByPk(evento_id);

    if (!usuario || !juego || !evento) {
      return res
        .status(400)
        .json({ error: "Usuario, juego o evento no encontrado" });
    }

    // Crea la participación
    const participacion = await ParticipacionEvento.create({
      usuario_id,
      juego_id,
      evento_id,
    });

    res.status(201).json(participacion);
  } catch (error) {
    console.error("Error al crear la participación en el evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/find", async (req, res) => {
  const { usuario_id, juego_id, evento_id } = req.query;

  try {
    // Construir la consulta de búsqueda
    const whereClause = {};
    if (usuario_id) whereClause.usuario_id = usuario_id;
    if (juego_id) whereClause.juego_id = juego_id;
    if (evento_id) whereClause.evento_id = evento_id;

    // Buscar participaciones
    const participaciones = await ParticipacionEvento.findAll({
      where: whereClause,
      include: [
        { model: Usuario, attributes: ["id", "nombre", "correo_electronico"] },
        { model: Juego, attributes: ["id", "nombre", "descripcion"] },
        { model: Evento, attributes: ["id", "fecha", "direccion","descripcion"] },
      ],
    });

    res.status(200).json(participaciones);
  } catch (error) {
    console.error("Error al buscar participaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    const participacion = await ParticipacionEvento.findByPk(id);
    if (!participacion) {
      return res.status(404).json({ error: "Participación no encontrada" });
    }

    // Eliminar la participación
    await participacion.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar participación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/findAll", async (req, res) => {
  const { usuario_id, juego_id, evento_id } = req.query;

  try {
    // Construir la consulta de búsqueda
    const whereClause = {};
    if (usuario_id) whereClause.usuario_id = usuario_id;
    if (juego_id) whereClause.juego_id = juego_id;
    if (evento_id) whereClause.evento_id = evento_id;

    // Buscar participaciones
    const participaciones = await ParticipacionEvento.findAll({
      where: whereClause,
      include: [
        { model: Usuario, attributes: ["id", "nombre", "correo_electronico"] },
        { model: Juego, attributes: ["id", "nombre", "descripcion"] },
        { model: Evento, attributes: ["id", "fecha", "direccion","descripcion"] },
      ],
    });

    // Enviar la respuesta con las participaciones encontradas
    res.status(200).json(participaciones);
  } catch (error) {
    // Manejar errores
    console.error("Error al buscar participaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
