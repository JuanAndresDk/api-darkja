const admin = require('firebase-admin');

const authenticateFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const idToken = authHeader.split(' ')[1];
      try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        req.user = decodedToken;
        next();
      } catch (error) {
        return res.status(401).json({ error: 'Unauthorized', message: error.message });
      }
    } else {
      return res.status(401).json({ error: 'No token provided' });
    }
};

module.exports = authenticateFirebaseToken;
