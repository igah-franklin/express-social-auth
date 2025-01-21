
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middlewares/authenticateToken');
const { signupRateLimiter }  = require('../middlewares/rateLimiters');
const authControllers = require('../controllers/auth.controller');
const emailVerificationController = require('../controllers/verifyEmail.controller');
const googleController = require('../controllers/google.controller');

router.route('/').get((req, res)=> res.json({ ping:'pong' }));
router.route('/auth/sign-up').post(signupRateLimiter, authControllers.signUp);
router.route('/auth/sign-in').post(authControllers.signIn);
router.route('/auth/refresh-token').post(authControllers.refreshToken);

router.route('/auth/verify-email').post(emailVerificationController.verifyEmail);
router.route('/auth/send-reset-password-link').post(authControllers.initiatePasswordReset);
router.route('/auth/reset-password').post(authControllers.resetPassword);

//third parties
//google
router.route('/auth/google').get(googleController.googleCreateRedirectURL);
router.route('/auth/google/callback').get(googleController.googleCallbackURL);




module.exports = router;
