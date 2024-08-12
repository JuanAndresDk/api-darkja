const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');
const authenticateFirebaseToken = require('../middleware/auth'); // Asegúrate de proteger las rutas si es necesario

// Rutas para manejar las series
router.post('/agregar', authenticateFirebaseToken, seriesController.agregarSerie);
router.get('/listar', authenticateFirebaseToken, seriesController.listarSeries);
router.put('/actualizar/:serieId', authenticateFirebaseToken, seriesController.modificarSerie);
router.delete('/eliminar/:serieId', authenticateFirebaseToken, seriesController.eliminarSerie);

// Rutas para manejar las temporadas dentro de una serie
router.post('/:serieId/agregar-temporadas', authenticateFirebaseToken, seriesController.agregarTemporada);
router.get('/:serieId/listar-temporadas', authenticateFirebaseToken, seriesController.listarTemporadas); 
router.put('/:serieId/actualizar-temporadas/:temporadaId', authenticateFirebaseToken, seriesController.modificarTemporada);
router.delete('/:serieId/eliminar-temporadas/:temporadaId', authenticateFirebaseToken, seriesController.eliminarTemporada);

// Rutas para manejar los capítulos dentro de una temporada
router.post(':serieId/temporadas/:temporadaId/agregar-capitulos', authenticateFirebaseToken, seriesController.agregarCapitulo);
router.get('/:serieId/temporadas/:temporadaId/listar-capitulos', authenticateFirebaseToken, seriesController.listarCapitulos);
router.put('/:serieId/temporadas/:temporadaId/actualizar-capitulos/:capituloId', authenticateFirebaseToken, seriesController.modificarCapitulo);
router.delete(':serieId/temporadas/:temporadaId/eliminar-capitulos/:capituloId', authenticateFirebaseToken, seriesController.eliminarCapitulo);

module.exports = router;
