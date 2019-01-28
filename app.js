const express = require('express');
const app = express();
const index = require('./src/web');
const api = require('./src/api');
const auth = require('./src/auth/AuthController');

// app.use('/api', )
app.use('/', index);

app.use('/api', api);

app.use('/authentication', auth);

module.exports = app;