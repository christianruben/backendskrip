const express = require('express');
const app = express();

// app.use('/api', )
app.use('/', (req, res, next) => {
    res.end('hello world');
})
module.exports = app;