const express = require('express');
const app = express();
const api = require('./src/api');

// app.use('/api', )
app.use('/', (req, res, next) => {
    res.end('hello world');
});

app.use('/api', api);

module.exports = app;