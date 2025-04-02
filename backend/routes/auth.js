const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


router.post(
  '/register',
  [
    check('username', 'Username is required').not().isEmpty(),
    check('username', 'Username must be at least 3 characters').isLength({ min: 3 }),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
  ],
  authController.register
);


router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  authController.login
);

router.get('/user', auth, authController.getCurrentUser);

module.exports = router; 