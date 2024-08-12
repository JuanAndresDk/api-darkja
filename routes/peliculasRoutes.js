const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasControllers ');
const authenticateJWT = require('../middleware/auth'); // Asegúrate de proteger las rutas si es necesario

// Ruta para agregar una nueva película
router.post('/agregar', authenticateJWT, peliculasController.agregarPelicula);

// Ruta para listar todas las películas
router.get('/listar', authenticateJWT, peliculasController.listarPeliculas);

// Ruta para modificar una película existente
router.put('/modificar/:id', authenticateJWT, peliculasController.modificarPelicula);

// Ruta para eliminar una película
router.delete('/eliminar/:id', authenticateJWT, peliculasController.eliminarPelicula);

module.exports = router;
