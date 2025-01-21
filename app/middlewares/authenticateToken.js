
const jwt = require('jsonwebtoken');
const {  UNAUTHORIZED } = require('../utils/errorMessages');
// Middleware to verify token

async function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(UNAUTHORIZED.status).send({ message: UNAUTHORIZED.message });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                console.log('Token expired');
                return res.status(UNAUTHORIZED.status).send({ message: 'Token expired' });
            }
            console.log('Token verification failed', err);
            return res.status(UNAUTHORIZED.status).send({ message: UNAUTHORIZED.message });
        }
        req.user = user;
        next();
    });
  }

  module.exports = { authenticateToken }