const express = require('express');
const route = express.Router();
const student = require('./student-report');
const teacher = require('./teacher-report');
const value = require('./value-report');
const schedule = require('./schedule-report');
route.use('/student', student);
route.use('/teacher', teacher);
route.use('/value', value);
route.use('/schedule', schedule);

module.exports = route;