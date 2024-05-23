var express = require("express");
var router = express.Router();
var Evento = require("../sequelize/models").Evento;
var Usuario = require("../sequelize/models").Usuario;
var Juego = require("../sequelize/models").Juego;

router.post("/create", async (req, res) => {
  try {
    const { master_id, juego_id, fecha, direccion } = req.body;

    // Validar si el usuario y el juego existen
    const usuario = await Usuario.findByPk(master_id);
    const juego = await Juego.findByPk(juego_id);

    if (!usuario || !juego) {
      return res.status(400).json({ error: "Usuario o juego no encontrado" });
    }

    // Crear el evento
    const evento = await Evento.create({
      master_id,
      juego_id,
      fecha,
      direccion,
    });

    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete", async (req, res) => {
  const eventoId = req.body.id;

  try {
    const evento = await Evento.findByPk(eventoId);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // Eliminar el evento
    await evento.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/update", async (req, res) => {
  const eventId = req.body.id;
  const { master_id, juego_id, fecha, direccion } = req.body;

  try {
    // Busca el evento a actualizar
    let evento = await Evento.findByPk(eventId);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // Actualiza los campos del evento
    evento.master_id = master_id;
    evento.juego_id = juego_id;
    evento.fecha = fecha;
    evento.direccion = direccion;

    // Guarda los cambios en la base de datos
    await evento.save();

    // Respuesta exitosa
    res.status(200).json(evento);
  } catch (error) {
    // Manejo de errores
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/find", async (req, res) => {
  const eventId = req.body.id; // Obtenemos el ID del evento de los parámetros de la URL

  try {
    // Busca el evento por su ID
    const evento = await Evento.findByPk(eventId);

    // Verifica si se encontró el evento
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // Responde con el evento encontrado
    res.status(200).json(evento);
  } catch (error) {
    // Manejo de errores
    console.error("Error al buscar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
