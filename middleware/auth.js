const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'your_jwt_secret', (err, user) => {
      if (err) {
        return res.status(403).json({ error: 'Token inválido' });
      }

      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

module.exports = authenticateJWT;
