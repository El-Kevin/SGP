const express = require('express');
const User = require('../controller/user');
const Token = require ('../controller/validate-token');
const router = express.Router();
router.post('/', User.newUser);
router.post('/login', User.newUser);
router.post('/logins', User.loginUser);    
module.exports = router;