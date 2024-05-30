// Import router to create routes and the models created with sequelize
var express = require("express");
var router = express.Router();
var Juego = require("../sequelize/models").Juego;

// Route for creating games
router.post("/create", async (req, res) => {
  //Receive variables
  const { nombre, descripcion, max_jugadores } = req.body;

  try {
    // Create the game with the received variables
    const nuevoJuego = await Juego.create({
      nombre,
      descripcion,
      max_jugadores,
    });
    res.status(201).json(nuevoJuego);
  } catch (error) {
    //If there was an error
    console.error("Error al crear juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


//Route for updating a game
router.put("/update", async (req, res) => {
  const juegoId = req.body.id;
  const { nombre, descripcion, max_jugadores } = req.body;

  try {
    // Find the event using its id
    const juego = await Juego.findByPk(juegoId);
    if (!juego) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

     // Update the data
    juego.nombre = nombre;
    juego.descripcion = descripcion;
    juego.max_jugadores = max_jugadores;

    // Save the changes in the database
    await juego.save();

    // If it was successful
    res.json(juego);
    console.log("actualizado");
  } catch (error) {
    // If there was an error
    console.error("Error al actualizar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for deleting a game by its ID
router.delete("/delete", async (req, res) => {
  const juegoId = req.body.id;

  //Find the event
  try {
    const juego = await Juego.findByPk(juegoId);
    if (!juego) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    // Delete the game
    await juego.destroy();

    // If it was successful
    res.status(204).send(); 
  } catch (error) {
    // If there was an error
    console.error("Error al eliminar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for finding a game by its name
router.post("/find", async (req, res) => {
  const gameName = req.body.nombre;

  try {
    const juego = await Juego.findOne({ where: { nombre: gameName } });
    console.log(juego);
    if (!juego) {
      // If it does not exist, return false, does not exist
      return res.json({ exists: false });
    } else {
      // If it exists, return true, exists
      return res.json({ exists: true });
    }
  } catch (error) {
    // If there was an error
    console.error("Error al buscar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route to find all games
router.post("/findAll", async (req, res) => {
  try {
    const juegos = await Juego.findAll(); // Find all games in the database
    res.json(juegos); // Return the list of games as the response
  } catch (error) {
    console.error("Error al buscar juegos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
