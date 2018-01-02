'use strict'

const express = require('express');
const UserController = require('../controllers/userController');

const api = express.Router();

api.get('/test', UserController.test);
api.post('/register', UserController.registerUser);
api.post('/login', UserController.login);

module.exports = api;