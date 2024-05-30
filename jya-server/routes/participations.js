// Import router to create routes and the models created with sequelize
var express = require("express");
var router = express.Router();
var Evento = require("../sequelize/models").Evento;
var Usuario = require("../sequelize/models").Usuario;
var Juego = require("../sequelize/models").Juego;
var ParticipacionEvento = require("../sequelize/models").ParticipacionEvento;

//// Route for creating participations
router.post("/create", async (req, res) => {
  //Receive variables
  const { usuario_id, juego_id, evento_id } = req.body;

  try {
    // Check that the user, the game and event exist
    const usuario = await Usuario.findByPk(usuario_id);
    const juego = await Juego.findByPk(juego_id);
    const evento = await Evento.findByPk(evento_id);
    //If there was an error
    if (!usuario || !juego || !evento) {
      return res
        .status(400)
        .json({ error: "Usuario, juego o evento no encontrado" });
    }

    // Create the participation
    const participacion = await ParticipacionEvento.create({
      usuario_id,
      juego_id,
      evento_id,
    });

    res.status(201).json(participacion);
  } catch (error) {
    //If there was an error
    console.error("Error al crear la participación en el evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for deleting a participation by its ID
router.delete("/delete", async (req, res) => {
  const { id } = req.body;

  try {
    //Find the participation
    const participacion = await ParticipacionEvento.findByPk(id);
    if (!participacion) {
      return res.status(404).json({ error: "Participación no encontrada" });
    }

    // It deletes teh participation
    await participacion.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar participación:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for finding a participation by its ID
router.post("/findAll", async (req, res) => {
  const { usuario_id } = req.body;

  try {
    // It builds the query
    const whereClause = { usuario_id: usuario_id };

    //It finds every participations
    const participaciones = await ParticipacionEvento.findAll({
      where: whereClause,
      include: [
        { model: Usuario, attributes: ["id", "nombre", "correo_electronico"] },
        { model: Juego, attributes: ["id", "nombre", "descripcion"] },
        {
          model: Evento,
          attributes: ["id", "fecha", "direccion", "descripcion"],
        },
      ],
    });

    // Find all games in the database
    res.status(200).json(participaciones);
  } catch (error) {
    console.error("Error al buscar participaciones:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
