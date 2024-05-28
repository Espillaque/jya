var express = require("express");
var router = express.Router();
var Usuario = require("../sequelize/models").Usuario;
const crypto = require("crypto");

// Ruta para obtener un usuario por su ID
router.post("/find", async (req, res) => {
  const userId = req.body.id;
  console.log(userId);
  try {
    // Buscar el usuario por su ID
    const usuario = await Usuario.findByPk(userId);

    // Si no se encuentra ningún usuario con el ID proporcionado
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Enviar el usuario encontrado como respuesta
    res.json(usuario);
  } catch (error) {
    console.error("Error al buscar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

/* GET users listing. */
router.get("/", function (req, res) {
  res.send("respond with a resource");
});

router.put("/update", async (req, res) => {
  const userId = req.body.id;
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Actualizar el usuario con los nuevos datos
    usuario.nombre = nombre;
    usuario.correo_electronico = correo_electronico;
    usuario.contrasena = contrasena;

    // Guardar los cambios
    await usuario.save();

    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/delete", async (req, res) => {
  const userId = req.body.id;

  try {
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await usuario.destroy();

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/create", async (req, res) => {
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo_electronico,
      contrasena,
    });
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/login", async (req, res) => {
  const { correo_electronico, contrasena } = req.body;
  try {
    const user = await Usuario.findOne({
      where: {
        correo_electronico: correo_electronico,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    if (user.contrasena === contrasena) {
      const token = crypto.randomUUID();
      res.status(200).json({ 
        token: token,
        userId: user.id,
        userName: user.nombre 
      });
    } else {
      res.status(404).json({ error: "Credenciales inválidas" });
    }
  } catch (error) {
    console.error("Error al loguear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});


module.exports = router;
