const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const api = require('./src/api');
const auth = require('./src/auth/AuthController');
const report = require('./src/report');
var cors = require('cors');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('public'));

app.set('views', __dirname+"/views");
app.set('view engine', 'ejs');

// app.use('/api', )

app.use(cors());
app.get('/', (req, res, next)=>{
    res.send('Hello');
})
app.use('/api', api);

app.use('/authentication', auth);

app.use('/report', report);

module.exports = app;