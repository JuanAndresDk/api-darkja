const admin = require('firebase-admin');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

exports.saveUsuario = async (req, res) => {
  const { email, password, name, photoURL, role } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  try {
    // Hashear la contraseña antes de almacenarla
    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({
      email,
      password: hashedPassword,
      displayName: name,
    });

    // Guardar datos adicionales en Realtime Database
    const db = admin.database();
    await db.ref('users/' + userRecord.uid).set({
      email,
      name,
      photoURL,
      role,
      password: hashedPassword,
    });

    // Generar un token JWT para el usuario recién creado
    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email, role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ uid: userRecord.uid, email: userRecord.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.getUsuario = async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);

    // Obtener datos adicionales desde Realtime Database
    const db = admin.database();
    const userSnapshot = await db.ref('users/' + user.uid).once('value');
    const userData = userSnapshot.val();

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      ...userData
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.putUsuario = async (req, res) => {
  const { displayName, photoURL } = req.body;
  const updates = {};

  if (displayName) updates.displayName = displayName;
  if (photoURL) updates.photoURL = photoURL;

  try {
    // Actualizar en Firebase Authentication
    await admin.auth().updateUser(req.user.uid, updates);

    // Actualizar en Realtime Database
    const db = admin.database();
    await db.ref('users/' + req.user.uid).update(updates);

    res.json({ message: 'User profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Obtener el usuario desde Firebase Authentication
    const userRecord = await admin.auth().getUserByEmail(email);

    // Obtener la información del usuario desde Realtime Database
    const db = admin.database();
    const userSnapshot = await db.ref('users/' + userRecord.uid).once('value');
    const userData = userSnapshot.val();

    if (!userData) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la contraseña hasheada almacenada
    const isMatch = await bcrypt.compare(password, userData.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Crear un JWT para el usuario autenticado
    const token = jwt.sign(
      { uid: userRecord.uid, email: userRecord.email, role: userData.role },
      process.env.JWT_SECRET, // Asegúrate de que JWT_SECRET esté configurado en las variables de entorno
      { expiresIn: '1h' }
    );
    console.log('JWT_SECRET:', process.env.JWT_SECRET);

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
