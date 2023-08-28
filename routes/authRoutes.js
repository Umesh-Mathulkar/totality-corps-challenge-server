const express = require('express');

const authController = require('../controllers/authController');
const isAuthenticated = require('../middleware/isAuthenticated');
const jwtAuth = require('../middleware/jwtAuth') 

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', jwtAuth, isAuthenticated, (req, res) => {
  res.status(200).json(req.user);
});


module.exports = router;
