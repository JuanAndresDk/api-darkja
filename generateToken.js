const admin = require('firebase-admin');
const serviceAccount = require('./darkja-p-firebase-adminsdk-h0ybv-f624eeca03.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://darkja-p-default-rtdb.firebaseio.com/"
});
async function createUserAndGenerateToken() {
    try {
      const user = await admin.auth().createUser({
        email: "testuser@example.com",
        password: "password123",
        displayName: "Test User",
        photoURL: "http://example.com/photo.jpg"
      });
  
      // Genera un ID Token para el usuario recién creado
      const token = await admin.auth().createCustomToken(user.uid);
      console.log("Custom Token:", token);
  
      // Para obtener un ID Token, necesitas intercambiar el Custom Token por un ID Token usando Firebase Authentication SDK (esto generalmente se hace en el cliente)
    } catch (error) {
      console.error("Error creating user:", error);
    }
  }
  
  createUserAndGenerateToken();
  