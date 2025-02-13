const express = require('express');
const router = express.Router();

Router.post('/login', usersController.login);

module.exports = router;