const express = require('express');
const router = express.Router();
const authController = require('../controllers/AuthenticationController');
const checkAuth = require('../middleware/auth-check');



router.post('/login', authController.login);

router.post('/logout', checkAuth, authController.logout);


module.exports = router;