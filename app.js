const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./src/web');
const api = require('./src/api');
const auth = require('./src/auth/AuthController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.use('/api', )
app.use('/', index);

app.use('/api', api);

app.use('/authentication', auth);

module.exports = app;