

const rateLimit = require('express-rate-limit');

// Rate limiting middleware
const signupRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes window
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts created from this IP, please try again after 5 minutes',
    handler: (req, res, /*next*/) => {
      res.status(429).json({ message: 'Too many accounts created from this IP, please try again after 5 minutes' });
    }
  });

const createDocumentRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes window
    max: 5, // limit each IP to 5 requests per windowMs
    message: 'Too many accounts requests, please try again after 5 minutes',
    handler: (req, res, /*next*/) => {
      res.status(429).json({ message: 'Too many accounts created from this IP, please try again after 5 minutes' });
    }
  });


  module.exports = { signupRateLimiter, createDocumentRateLimiter }