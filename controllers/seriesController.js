const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Agregar una nueva serie
exports.agregarSerie = async (req, res) => {
    const { nombre, descripcion, imagen } = req.body;

    try {
        const serieId = uuidv4(); // Generar un ID único para la serie
        const db = admin.database();
        await db.ref('series/' + serieId).set({
            nombre,
            descripcion,
            imagen,
        });

        res.status(201).json({ message: 'Serie agregada correctamente', id: serieId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Agregar una nueva temporada a una serie
exports.agregarTemporada = async (req, res) => {
    const { serieId } = req.params;
    const { nombre, imagen } = req.body;

    try {
        const temporadaId = uuidv4(); // Generar un ID único para la temporada
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}`).set({
            nombre,
            imagen,
        });

        res.status(201).json({ message: 'Temporada agregada correctamente', id: temporadaId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Agregar un nuevo capítulo a una temporada
exports.agregarCapitulo = async (req, res) => {
    const { serieId, temporadaId } = req.params;
    const { nombre, numero, url } = req.body;

    try {
        const capituloId = uuidv4(); // Generar un ID único para el capítulo
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/capitulos/${capituloId}`).set({
            nombre,
            numero,
            url,
        });

        res.status(201).json({ message: 'Capítulo agregado correctamente', id: capituloId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas las series
exports.listarSeries = async (req, res) => {
    try {
        const db = admin.database();
        const snapshot = await db.ref('series').once('value');
        const series = snapshot.val();

        res.status(200).json(series);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todas las temporadas de una serie
exports.listarTemporadas = async (req, res) => {
    const { serieId } = req.params;

    try {
        const db = admin.database();
        const snapshot = await db.ref(`series/${serieId}/temporadas`).once('value');
        const temporadas = snapshot.val();

        res.status(200).json(temporadas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Listar todos los capítulos de una temporada específica
exports.listarCapitulos = async (req, res) => {
    const { serieId, temporadaId } = req.params;

    try {
        const db = admin.database();
        const snapshot = await db.ref(`series/${serieId}/temporadas/${temporadaId}/capitulos`).once('value');
        const capitulos = snapshot.val();

        res.status(200).json(capitulos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar una serie existente
exports.modificarSerie = async (req, res) => {
    const { serieId } = req.params;
    const { nombre, descripcion, imagen } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}`).update({
            nombre,
            descripcion,
            imagen,
        });

        res.status(200).json({ message: 'Serie modificada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar una temporada existente
exports.modificarTemporada = async (req, res) => {
    const { serieId, temporadaId } = req.params;
    const { nombre, imagen } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}`).update({
            nombre,
            imagen,
        });

        res.status(200).json({ message: 'Temporada modificada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Modificar un capítulo existente
exports.modificarCapitulo = async (req, res) => {
    const { serieId, temporadaId, capituloId } = req.params;
    const { nombre, numero, url } = req.body;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/capitulos/${capituloId}`).update({
            nombre,
            numero,
            url,
        });

        res.status(200).json({ message: 'Capítulo modificado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una serie completa
exports.eliminarSerie = async (req, res) => {
    const { serieId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}`).remove();

        res.status(200).json({ message: 'Serie eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una temporada de una serie
exports.eliminarTemporada = async (req, res) => {
    const { serieId, temporadaId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}`).remove();

        res.status(200).json({ message: 'Temporada eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un capítulo de una temporada
exports.eliminarCapitulo = async (req, res) => {
    const { serieId, temporadaId, capituloId } = req.params;

    try {
        const db = admin.database();
        await db.ref(`series/${serieId}/temporadas/${temporadaId}/capitulos/${capituloId}`).remove();

        res.status(200).json({ message: 'Capítulo eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
