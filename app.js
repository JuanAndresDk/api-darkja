require('dotenv').config();
const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require('body-parser');
const cors = require('cors');

const serviceAccount = require('./darkja-p-firebase-adminsdk-h0ybv-f624eeca03.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://darkja-p-default-rtdb.firebaseio.com/"
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const usuariosRoutes = require('./routes/usuariosRoutes');
const peliculasRoutes = require('./routes/peliculasRoutes'); // Importar las rutas de películas
const seriesRoutes = require('./routes/seriesRoutes'); 

// Utilizar las rutas de usuarios
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/peliculas', peliculasRoutes); 
app.use('/api/series', seriesRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
