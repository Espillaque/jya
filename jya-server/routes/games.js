var express = require("express");
var router = express.Router();
var Juego = require("../sequelize/models").Juego; // Asegúrate de que la ruta sea correcta

router.post("/create", async (req, res) => {
  const { nombre, descripcion, max_jugadores } = req.body;

  try {
    const nuevoJuego = await Juego.create({
      nombre,
      descripcion,
      max_jugadores,
    });
    res.status(201).json(nuevoJuego);
  } catch (error) {
    console.error("Error al crear juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/update", async (req, res) => {
  const juegoId = req.body.id;
  const { nombre, descripcion, max_jugadores } = req.body;

  try {
    const juego = await Juego.findByPk(juegoId);
    if (!juego) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    // Actualizar el juego con los nuevos datos
    juego.nombre = nombre;
    juego.descripcion = descripcion;
    juego.max_jugadores = max_jugadores;

    // Guardar los cambios
    await juego.save();

    res.json(juego);
    console.log("actualizado");
  } catch (error) {
    console.error("Error al actualizar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/delete", async (req, res) => {
  const juegoId = req.body.id;

  try {
    const juego = await Juego.findByPk(juegoId);
    if (!juego) {
      return res.status(404).json({ error: "Juego no encontrado" });
    }

    // Eliminar el juego
    await juego.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/find", async (req, res) => {
  const gameName = req.body.gameName;

  try {
    const juego = await Juego.findOne({ where: { nombre: gameName } });

    if (!juego) {
      // Si el juego no existe, enviar una respuesta indicando que no existe
      return res.json({ exists: false });
    } else {
      // Si el juego existe, enviar una respuesta indicando que existe
      return res.json({ exists: true });
    }
  } catch (error) {
    console.error("Error al buscar juego:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


router.post("/findAll", async (req, res) => {
  try {
    const juegos = await Juego.findAll(); // Buscar todos los juegos en la base de datos
    res.json(juegos); // Enviar la lista de juegos como respuesta
  } catch (error) {
    console.error("Error al buscar juegos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

module.exports = router;
