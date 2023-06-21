// authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = 'X8J6kZ8mD4G58N5M5x7GJ5v77h36Hk75c6n3Bz7R'; 


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return res.status(401).send({ message: "Unauthorized!" });
    }

    req.userId = decoded.id;
    req.matricula = decoded.matricula;
    next();
  });
};

module.exports = verifyToken;