var express = require("express");
var router = express.Router();
var Usuario = require("../sequelize/models").Usuario;
const crypto = require("crypto");

// Route for finding an user by its ID
router.post("/find", async (req, res) => {
  const userId = req.body.id;
  // console.log(userId);
  try {
    const usuario = await Usuario.findByPk(userId);

    // If it does not exist
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Return the user
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

//Route for updating an user
router.put("/update", async (req, res) => {
  const userId = req.body.id;
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    // Find the user using its id
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Update the data
    usuario.nombre = nombre;
    usuario.correo_electronico = correo_electronico;
    usuario.contrasena = contrasena;

    // It saves the data
    await usuario.save();

    //If it was sucessful
    res.json(usuario);
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for deleting an user by its ID
router.delete("/delete", async (req, res) => {
  const userId = req.body.id;

  try {
    //Find the user
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // It deletes the user
    await usuario.destroy();

    res.status(204).send(); 
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

//Route for creating user
router.post("/create", async (req, res) => {
  
  //Receive variables
  const { nombre, correo_electronico, contrasena } = req.body;

  try {
    //Create the user with the received variables
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
  //It receives datas
  const { correo_electronico, contrasena } = req.body;
  try {
    //It finds the user(email)
    const user = await Usuario.findOne({
      where: {
        correo_electronico: correo_electronico,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    //It checks if the password was correct and create token randomized, its id and user name
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
