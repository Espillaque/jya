var express = require("express");
var router = express.Router();
var Evento = require("../sequelize/models").Evento;
var Usuario = require("../sequelize/models").Usuario;
var Juego = require("../sequelize/models").Juego;
var ParticipacionEvento = require("../sequelize/models").ParticipacionEvento;

router.post('/create', async (req, res) => {
    const { usuario_id, juego_id, evento_id } = req.body;
  
    try {
      // Validar si el usuario, el juego y el evento existen
      const usuario = await Usuario.findByPk(usuario_id);
      const juego = await Juego.findByPk(juego_id);
      const evento = await Evento.findByPk(evento_id);
  
      if (!usuario || !juego || !evento) {
        return res.status(400).json({ error: 'Usuario, juego o evento no encontrado' });
      }
  
      // Crear la participación
      const participacion = await ParticipacionEvento.create({
        usuario_id,
        juego_id,
        evento_id
      });
  
      res.status(201).json(participacion);
    } catch (error) {
      console.error('Error al crear la participación en el evento:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  

module.exports = router;