const express = require('express');
const user = require('../controllers/authController');
const router = express.Router();
const auth = require('../middleware/authMiddleware')

router.get('/profile',  auth, user.getprofile);
router.post('/login', user.login);
router.post('/signup', user.signup);

module.exports = router;