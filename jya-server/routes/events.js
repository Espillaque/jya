// Import router to create routes and the models created with sequelize

var express = require("express");
var router = express.Router();
var Evento = require("../sequelize/models").Evento;
var Usuario = require("../sequelize/models").Usuario;
var Juego = require("../sequelize/models").Juego;

// Route for creating events
router.post("/create", async (req, res) => {
  try {
    
    // Receive variables
    const { master_id, juego_id, fecha, direccion, descripcion } = req.body;
    // console.log("Data received:", { master_id, juego_id, fecha, direccion, descripcion });
    
    // Check that the user and the game exist
    const usuario = await Usuario.findByPk(master_id);
    const juego = await Juego.findByPk(juego_id);

    if (!usuario || !juego) {
      return res.status(400).json({ error: "Usuario/juego no encontrado" });
    }

    // Create the event with the received variables
    const evento = await Evento.create({
      master_id,
      juego_id,
      fecha,
      direccion,
      descripcion,
    });

    res.status(201).json(evento);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//Route for deleting an event by its ID
router.delete("/delete", async (req, res) => {
  const eventoId = req.body.id;

  //Find the event
  try {
    const evento = await Evento.findByPk(eventoId);
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // Delete the event
    await evento.destroy();

    res.status(204).send(); 
  } catch (error) {
    console.error("Error al eliminar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Route for updating an event
router.put("/update", async (req, res) => {
  const eventId = req.body.id;
  const { master_id, juego_id, fecha, direccion } = req.body;

  try {
    // Find the event using its id
    let evento = await Evento.findByPk(eventId);

    //if it was not found
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // Update the data
    evento.master_id = master_id;
    evento.juego_id = juego_id;
    evento.fecha = fecha;
    evento.direccion = direccion;

    // Save the changes in the database
    await evento.save();

    // If it was successful
    res.status(200).json(evento);
  } catch (error) {
    // If there was an error
    console.error("Error al actualizar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for finding an event by its id
router.post("/find", async (req, res) => {
  const eventId = req.body.id; 

  try {
    // Find the event by its ID
    const evento = await Evento.findByPk(eventId);

    // Check if the event was found
    if (!evento) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    // If it was sucessful
    res.status(200).json(evento);
  } catch (error) {
    // If there was an error
    console.error("Error al buscar evento:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route to find all events
router.post("/findAll", async (req, res) => {
  try {
    const eventos = await Evento.findAll(); // Find all events in the database    
    res.json(eventos); // Send the list of events as the response
  } catch (error) {
    //If there was an error
    console.error("Error al buscar eventos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;