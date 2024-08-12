const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers');
const authenticateJWT = require('../middleware/auth');

// Ruta para registrar un nuevo usuario
router.post('/registrar', usuariosController.saveUsuario);

// Ruta para obtener los datos del usuario autenticado
router.get('/listar', authenticateJWT, usuariosController.getUsuario);

// Ruta para actualizar el perfil del usuario autenticado
router.put('/actualizar', authenticateJWT, usuariosController.putUsuario);

// Ruta para el inicio de sesión
router.post('/login', usuariosController.loginUsuario);

module.exports = router;
