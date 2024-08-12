const admin = require('firebase-admin');
const { check, validationResult } = require('express-validator');

exports.saveUsuario = [
  check('email').isEmail(),
  check('password').isLength({ min: 6 }),
  async (req, res) => {
    const { email, password, displayName, photoURL } = req.body;
    console.log("Ingreso a guardar");
    try {
      const userRecord = await admin.auth().createUser({
        email,
        password,
        displayName,
        photoURL,
        rol
      });

      // Guardar datos adicionales en Realtime Database
      const db = admin.database();

      await db.ref('users/' + userRecord.uid).set({
        email,
        displayName,
        photoURL,
      });

      res.status(201).json({ uid: userRecord.uid, email: userRecord.email });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
]

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
