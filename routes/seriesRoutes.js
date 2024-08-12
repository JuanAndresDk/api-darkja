const express = require('express');
const router = express.Router();
const seriesController = require('../controllers/seriesController');
const authenticateJWT = require('../middleware/auth'); // Asegúrate de proteger las rutas si es necesario

// Rutas para manejar las series
router.post('/agregar', authenticateJWT, seriesController.agregarSerie);
router.get('/listar', authenticateJWT, seriesController.listarSeries);
router.put('/actualizar/:serieId', authenticateJWT, seriesController.modificarSerie);
router.delete('/eliminar/:serieId', authenticateJWT, seriesController.eliminarSerie);

// Rutas para manejar las temporadas dentro de una serie
router.post('/:serieId/agregar-temporadas', authenticateJWT, seriesController.agregarTemporada);
router.get('/:serieId/listar-temporadas', authenticateJWT, seriesController.listarTemporadas); 
router.put('/:serieId/actualizar-temporadas/:temporadaId', authenticateJWT, seriesController.modificarTemporada);
router.delete('/:serieId/eliminar-temporadas/:temporadaId', authenticateJWT, seriesController.eliminarTemporada);

// Rutas para manejar los capítulos dentro de una temporada
router.post(':serieId/temporadas/:temporadaId/agregar-capitulos', authenticateJWT, seriesController.agregarCapitulo);
router.get('/:serieId/temporadas/:temporadaId/listar-capitulos', authenticateJWT, seriesController.listarCapitulos);
router.put('/:serieId/temporadas/:temporadaId/actualizar-capitulos/:capituloId', authenticateJWT, seriesController.modificarCapitulo);
router.delete(':serieId/temporadas/:temporadaId/eliminar-capitulos/:capituloId', authenticateJWT, seriesController.eliminarCapitulo);

module.exports = router;
