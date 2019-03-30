const express = require('express');
const route = express.Router();
const model_admin = require('../../model/admin');
const verifyToken = require('../verification');
const upload = require('../upload');

module.exports = route;