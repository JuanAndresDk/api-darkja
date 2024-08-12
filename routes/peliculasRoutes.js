const express = require('express');
const router = express.Router();
const peliculasController = require('../controllers/peliculasControllers ');
const authenticateFirebaseToken = require('../middleware/auth'); // Asegúrate de proteger las rutas si es necesario

// Ruta para agregar una nueva película
router.post('/agregar', authenticateFirebaseToken, peliculasController.agregarPelicula);

// Ruta para listar todas las películas
router.get('/listar', authenticateFirebaseToken, peliculasController.listarPeliculas);

// Ruta para modificar una película existente
router.put('/modificar/:id', authenticateFirebaseToken, peliculasController.modificarPelicula);

// Ruta para eliminar una película
router.delete('/eliminar/:id', authenticateFirebaseToken, peliculasController.eliminarPelicula);

module.exports = router;
