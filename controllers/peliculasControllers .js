const admin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

// Agregar una nueva película
exports.agregarPelicula = async (req, res) => {
    const { nombre, descripcion, url, imagen } = req.body;

    try {
        const peliculaId = uuidv4(); // Generar un ID único para la película
        const db = admin.database();
        await db.ref('peliculas/' + peliculaId).set({
            nombre,
            descripcion,
            url,
            imagen,
        });

        res.status(201).json({ message: 'Película agregada correctamente', id: peliculaId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todas las películas
exports.listarPeliculas = async (req, res) => {
    try {
        const db = admin.database();
        const snapshot = await db.ref('peliculas').once('value');
        const peliculas = snapshot.val();

        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Modificar una película existente
exports.modificarPelicula = async (req, res) => {
    const { nombre, descripcion, url, imagen } = req.body;
    const { id } = req.params; // ID de la película que se va a modificar

    try {
        const db = admin.database();
        await db.ref('peliculas/' + id).update({
            nombre,
            descripcion,
            url,
            imagen,
        });

        res.status(200).json({ message: 'Película modificada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una película
exports.eliminarPelicula = async (req, res) => {
    const { id } = req.params; // ID de la película que se va a eliminar

    try {
        const db = admin.database();
        await db.ref('peliculas/' + id).remove();

        res.status(200).json({ message: 'Película eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
