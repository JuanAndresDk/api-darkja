const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosControllers');
const authenticateFirebaseToken = require('../middleware/auth');

// Ruta para registrar un nuevo usuario
router.post('/registrar', usuariosController.saveUsuario);

// Ruta para obtener los datos del usuario autenticado
router.get('/listar', authenticateFirebaseToken, usuariosController.getUsuario);

// Ruta para actualizar el perfil del usuario autenticado
router.put('/actualizar', authenticateFirebaseToken, usuariosController.putUsuario);

module.exports = router;
